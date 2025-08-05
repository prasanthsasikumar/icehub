# CSV Bulk User Import Guide

## CSV Format

The CSV file should include the following columns (header row required):

| Column | Required | Type | Description | Example Values |
|--------|----------|------|-------------|----------------|
| `name` | ✅ Yes | String | Full name of the user | "John Doe" |
| `email` | ✅ Yes | String | Unique email address | "john.doe@example.com" |
| `bio` | ❌ No | String | User biography/description | "Passionate full-stack developer..." |
| `password` | ❌ No | String | User password (defaults to "workshop123") | "securepass123" |
| `userRole` | ❌ No | String | Community role: "developer" or "mentor" | "developer", "mentor" |
| `affiliation` | ❌ No | String | Organization, university, or company | "University of Colombo", "Google" |
| `expertise` | ❌ No | String | Primary area of expertise | "Machine Learning and AI" |
| `gender` | ❌ No | String | Gender identity | "male", "female", "non-binary", "other" |
| `skills` | ❌ No | String | Comma-separated skills list in quotes | "JavaScript,React,Node.js,Python" |

## Sample CSV Content

```csv
name,email,bio,password,userRole,affiliation,expertise,gender,skills
John Doe,john.doe@example.com,Passionate full-stack developer with 3 years of experience,workshop123,developer,University of Colombo,Web Development and UI/UX Design,male,"JavaScript,React,Node.js,Python"
Sarah Johnson,sarah.johnson@example.com,AI researcher focusing on machine learning applications,workshop123,mentor,Google DeepMind,Machine Learning and Deep Learning,female,"Python,TensorFlow,PyTorch,Machine Learning"
```

## Important Notes

1. **Header Row**: The first row must contain column headers exactly as specified above
2. **Required Fields**: Only `name` and `email` are required
3. **Skills Format**: Skills should be comma-separated and enclosed in quotes if they contain commas
4. **Default Values**:
   - `password`: "workshop123" if not provided
   - `userRole`: "developer" if not provided
   - `role`: Always set to "user" (admin roles must be assigned manually)
5. **Email Uniqueness**: Duplicate emails will be skipped during import
6. **Data Validation**: Empty names or emails will cause rows to be skipped

## Gender Options

- `male`
- `female` 
- `non-binary`
- `other`
- Leave empty for "prefer not to say"

## User Roles

- `developer`: Regular workshop participant
- `mentor`: Can guide other developers and has special group privileges

## Skills Recommendations

Common skills include:
- **Frontend**: JavaScript, React, Vue.js, Angular, HTML, CSS, TypeScript
- **Backend**: Node.js, Python, Java, PHP, C#, Go, Rust
- **Mobile**: React Native, Flutter, Swift, Kotlin
- **Database**: MySQL, PostgreSQL, MongoDB, Redis
- **Cloud**: AWS, Azure, Google Cloud, Docker, Kubernetes
- **Other**: Machine Learning, Data Science, UI/UX Design, DevOps

## Processing Behavior

- **Success**: Users are created with hashed passwords and default profile images
- **Duplicates**: Users with existing email addresses are skipped
- **Errors**: Invalid rows are skipped and reported in the response
- **Validation**: All data is trimmed and validated before creation

## Sample File

A comprehensive sample file (`sample_users_comprehensive.csv`) is included in the project root with example data demonstrating all supported fields.
