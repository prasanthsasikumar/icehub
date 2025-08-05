#!/usr/bin/env node

/**
 * Performance testing script for team page loading
 * Measures multiple performance metrics for both endpoints
 */

import { performance } from 'perf_hooks';

const TEAM_ID = '921bd9e9-11e4-494c-b121-0f363eb0ddb6';
const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://ice2025.com' 
  : 'http://localhost:3000';

const endpoints = {
  complete: `/api/teams/${TEAM_ID}/complete`,
  individual: {
    team: `/api/teams/${TEAM_ID}`,
    links: `/api/teams/${TEAM_ID}/links`,
    images: `/api/teams/${TEAM_ID}/images`
  }
};

async function fetchWithTiming(url) {
  const start = performance.now();
  
  try {
    const response = await fetch(`${BASE_URL}${url}`);
    const data = await response.json();
    const end = performance.now();
    
    return {
      success: true,
      time: end - start,
      size: JSON.stringify(data).length,
      status: response.status
    };
  } catch (error) {
    const end = performance.now();
    return {
      success: false,
      time: end - start,
      error: error.message
    };
  }
}

async function testCompleteEndpoint() {
  console.log('🚀 Testing Complete Endpoint (/complete)...');
  const result = await fetchWithTiming(endpoints.complete);
  
  if (result.success) {
    console.log(`✅ Complete endpoint: ${result.time.toFixed(2)}ms (${(result.size / 1024).toFixed(2)}KB)`);
  } else {
    console.log(`❌ Complete endpoint failed: ${result.error}`);
  }
  
  return result;
}

async function testIndividualEndpoints() {
  console.log('📊 Testing Individual Endpoints (sequential)...');
  
  const results = {};
  let totalTime = 0;
  let totalSize = 0;
  
  for (const [name, url] of Object.entries(endpoints.individual)) {
    const result = await fetchWithTiming(url);
    results[name] = result;
    
    if (result.success) {
      totalTime += result.time;
      totalSize += result.size;
      console.log(`  ${name}: ${result.time.toFixed(2)}ms (${(result.size / 1024).toFixed(2)}KB)`);
    } else {
      console.log(`  ${name}: FAILED - ${result.error}`);
    }
  }
  
  console.log(`🕐 Sequential total: ${totalTime.toFixed(2)}ms (${(totalSize / 1024).toFixed(2)}KB)`);
  
  return { results, totalTime, totalSize };
}

async function testParallelEndpoints() {
  console.log('⚡ Testing Individual Endpoints (parallel)...');
  
  const start = performance.now();
  const promises = Object.entries(endpoints.individual).map(([name, url]) => 
    fetchWithTiming(url).then(result => ({ name, ...result }))
  );
  
  const results = await Promise.all(promises);
  const end = performance.now();
  const parallelTime = end - start;
  
  let totalSize = 0;
  results.forEach(result => {
    if (result.success) {
      totalSize += result.size;
      console.log(`  ${result.name}: ${result.time.toFixed(2)}ms (${(result.size / 1024).toFixed(2)}KB)`);
    } else {
      console.log(`  ${result.name}: FAILED - ${result.error}`);
    }
  });
  
  console.log(`⚡ Parallel total: ${parallelTime.toFixed(2)}ms (${(totalSize / 1024).toFixed(2)}KB)`);
  
  return { results, parallelTime, totalSize };
}

async function runPerformanceTest() {
  console.log(`\n🔍 Performance Testing: ${BASE_URL}\n`);
  
  // Test complete endpoint
  const completeResult = await testCompleteEndpoint();
  
  console.log('');
  
  // Test individual endpoints (sequential)
  const sequentialResult = await testIndividualEndpoints();
  
  console.log('');
  
  // Test individual endpoints (parallel)
  const parallelResult = await testParallelEndpoints();
  
  console.log('\n📈 Performance Summary:');
  console.log('=' .repeat(50));
  
  if (completeResult.success) {
    console.log(`Complete endpoint:    ${completeResult.time.toFixed(2)}ms`);
    
    const sequentialImprovement = sequentialResult.totalTime > 0 
      ? ((sequentialResult.totalTime - completeResult.time) / sequentialResult.totalTime * 100)
      : 0;
    
    const parallelImprovement = parallelResult.parallelTime > 0 
      ? ((parallelResult.parallelTime - completeResult.time) / parallelResult.parallelTime * 100)
      : 0;
    
    console.log(`Sequential approach:  ${sequentialResult.totalTime.toFixed(2)}ms`);
    console.log(`Parallel approach:    ${parallelResult.parallelTime.toFixed(2)}ms`);
    console.log('');
    console.log(`🎯 Improvement vs Sequential: ${sequentialImprovement.toFixed(1)}%`);
    console.log(`🎯 Improvement vs Parallel:   ${parallelImprovement.toFixed(1)}%`);
    
    if (sequentialImprovement > 0) {
      console.log(`\n🚀 The complete endpoint is ${sequentialImprovement.toFixed(1)}% faster than sequential calls!`);
    }
  }
  
  console.log('\n💡 Recommendations:');
  console.log('- Use the /complete endpoint for initial page load');
  console.log('- Cache responses for 30-60 seconds');
  console.log('- Use lazy loading for non-critical data');
  console.log('- Optimize images with proper loading attributes');
}

runPerformanceTest().catch(console.error);
