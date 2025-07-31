# Sports Heroes User Approval System Setup Guide

This guide explains how to set up and configure the optional user approval system for the Sports Heroes Reading App.

## Overview

**Current System**: Any user with a Google account can automatically register and access the app.

**With Approval System**: Administrators can control who gets access by requiring manual approval for new users.

## Installation

### 1. Upload the User Approval Plugin

**Option A: WordPress Admin Upload**
1. Go to WordPress Admin → Plugins → Add New
2. Click "Upload Plugin"
3. Upload `user-approval-system.php`
4. Click "Activate Plugin"

**Option B: Manual Installation**
1. Copy `user-approval-system.php` to `/wp-content/plugins/`
2. Go to WordPress Admin → Plugins
3. Find "Sports Heroes User Approval System" and click "Activate"

### 2. Configure Approval Settings

After activation, you'll see new menu items under "Sports Heroes":

1. **Go to Sports Heroes → Settings**
2. **Enable User Approval**:
   - Check "Require administrator approval for new users"
   - Set notification email (where to send new user alerts)
   - Optionally add auto-approve domains (e.g., yourschool.edu)
3. **Click "Save Settings"**

## How It Works

### For New Users (When Approval is Enabled)

1. **User Signs In**: User clicks "Sign in with Google"
2. **Account Created**: WordPress user account is created with "pending" status
3. **Access Blocked**: User is redirected to pending approval page
4. **Admin Notified**: Email sent to administrator about new user
5. **Admin Reviews**: Administrator approves or denies the user
6. **User Notified**: Email sent to user about approval/denial decision
7. **Access Granted**: Approved users can now access the app

### For Existing Users

- **Existing users are automatically approved** when you first enable the system
- **No disruption** to current users' access

## Admin Dashboard Features

### User Approval Management

**Location**: Sports Heroes → User Approval

**Three Tabs**:
- **Pending Approval**: Users waiting for review
- **Approved**: Users with access to the app
- **Denied**: Users who were denied access

**Actions Available**:
- **Individual Actions**: Approve, deny, or view user details
- **Bulk Actions**: Approve multiple users at once
- **Status Changes**: Revoke approval or approve denied users

### Settings Configuration

**Location**: Sports Heroes → Settings

**Options**:
- **Enable/Disable Approval**: Toggle the entire approval system
- **Notification Email**: Where to send new user alerts
- **Auto-Approve Domains**: Automatically approve users from trusted domains

### WordPress Users Integration

The approval system also integrates with the standard WordPress Users page:

- **New Column**: "Sports Heroes Status" shows approval status
- **Bulk Actions**: "Approve for Sports Heroes" and "Deny for Sports Heroes"
- **Quick Management**: Handle approvals from familiar WordPress interface

## Configuration Options

### Auto-Approve Domains

You can automatically approve users from trusted email domains:

```
yourschool.edu
trustedorganization.org
company.com
```

**How it works**:
- Users with emails from these domains are automatically approved
- Other users still require manual approval
- Leave blank to require approval for all users

### Email Notifications

**Admin Notifications**: When enabled, administrators receive emails about:
- New user registrations requiring approval
- User details and direct links to approval page

**User Notifications**: Users automatically receive emails about:
- Account approval with welcome message and app link
- Account denial with reason (if provided)

## User Experience

### Pending Approval Page

When users need approval, they see a friendly page explaining:
- Their account is pending review
- They'll receive an email when approved
- What the approval process involves

**Features**:
- Professional, branded design
- Clear next steps
- "Check Status Again" button
- Contact information

### Access Denied Page

If a user is denied access, they see:
- Clear explanation of denial
- Contact information for appeals
- Professional, respectful messaging

## API Integration

The approval system provides REST API endpoints:

```
GET /wp-json/sports-heroes/v1/user-status/{user_id}
```

**Response**:
```json
{
  "user_id": 123,
  "approval_status": "pending|approved|denied",
  "is_approved": true|false,
  "approval_required": true|false
}
```

This allows the Next.js app to check approval status during authentication.

## Troubleshooting

### Common Issues

**1. Approval System Not Working**
- Verify plugin is activated
- Check that approval is enabled in settings
- Ensure user has administrator role

**2. Users Not Receiving Emails**
- Check WordPress email configuration
- Verify notification email address is correct
- Check spam folders

**3. Existing Users Affected**
- Existing users should be automatically approved
- If not, go to User Approval page and bulk approve them

### Debug Steps

**Check User Status**:
```sql
SELECT user_id, meta_key, meta_value 
FROM wp_usermeta 
WHERE meta_key = 'sports_heroes_approval_status';
```

**Reset User Status** (if needed):
```sql
UPDATE wp_usermeta 
SET meta_value = 'approved' 
WHERE meta_key = 'sports_heroes_approval_status' 
AND user_id = [USER_ID];
```

## Migration Guide

### Enabling Approval for Existing Site

1. **Install and activate** the user approval plugin
2. **Don't enable approval yet** - all existing users need to be marked as approved first
3. **Go to Sports Heroes → User Approval**
4. **Check the statistics** - you should see existing users listed as approved
5. **If users show as "not set"**, use the bulk approve feature
6. **Once all existing users are approved**, enable the approval requirement in settings

### Disabling Approval System

1. **Go to Sports Heroes → Settings**
2. **Uncheck "Require administrator approval"**
3. **Save settings**
4. **New users will be automatically approved**
5. **Existing approval statuses remain unchanged**

## Security Considerations

### Access Control
- Only WordPress administrators can manage approvals
- All approval actions are logged with admin user ID
- Approval status is stored securely in WordPress user meta

### Email Security
- Approval emails include minimal user information
- No sensitive data is transmitted in notifications
- Email addresses are validated before sending

### Data Privacy
- User approval status is stored in WordPress database
- No external services are used for approval workflow
- Denial reasons are optional and stored locally

## Best Practices

### For Schools/Organizations

1. **Use Auto-Approve Domains**: Add your organization's email domain
2. **Set Clear Policies**: Define who should be approved
3. **Regular Review**: Periodically review approved users
4. **Communication**: Inform users about the approval process

### For Public Sites

1. **Clear Criteria**: Define approval criteria publicly
2. **Timely Response**: Review pending users regularly
3. **Professional Communication**: Use clear, respectful denial reasons
4. **Appeal Process**: Provide contact information for appeals

## Support

### Getting Help

If you encounter issues:

1. **Check this guide** for common solutions
2. **Review WordPress error logs** (`/wp-content/debug.log`)
3. **Test with a new user account** to verify the flow
4. **Check email delivery** with a test notification

### Customization

The approval system can be customized:

- **Email templates**: Modify the email messages in the plugin code
- **Page styling**: Customize the pending/denied pages in the Next.js app
- **Approval criteria**: Add custom logic to the approval workflow
- **Integration**: Connect with external systems via WordPress hooks

This user approval system provides complete control over who can access your Sports Heroes Reading App while maintaining a professional user experience.
