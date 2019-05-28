## Documentation

You can see below the API reference of this module.

### `ISMSPH(options)`
Creates the instance of the `ISMSPH` class.


### `sendMessage(params, cb)`
Send a message to single destination.

#### Params

- **Object** `params`: The iSMS API parameters (documented [here](https://www.bulksms.com.ph/bulk-sms-philippines-api.php)).
- **Function** `cb`: The callback function.


### `sendMessageByGroupId(params, cb)`
Send SMS by Group ID

#### Params

- **Object** `params`: The iSMS API parameters (documented [here](https://www.bulksms.com.ph/bulk-sms-philippines-api.php)).
- **Function** `cb`: The callback function.


### `sendMessageByRecipientName(params, cb)`
Send SMS by Recipient Name 

#### Params

- **Object** `params`: The iSMS API parameters (documented [here](https://www.bulksms.com.ph/bulk-sms-philippines-api.php)).
- **Function** `cb`: The callback function.


### `getContactListGroup(cb)`
Get Contact List Group 

#### Params

- **Function** `cb`: The callback function.


### `getContactListByGroupId(groupId, cb)`
Get Contact List Based on the Group ID 

#### Params

- **Integer** `groupId`: The ID of Group in contact list.
- **Function** `cb`: The callback function.


### `getContactList(cb)`
Get All Contact List from Phone Book 

#### Params

- **Function** `cb`: The callback function.


### `createContactGroup(groupName, cb)`
Create New Contact Group

#### Params

- **Integer** `groupName`: The name of group that will be created.
- **Function** `cb`: The callback function.


### `updateContactGroup(groupName, groupId, cb)`
Update Group Name

#### Params

- **Integer** `groupName`: The name of group that will be created.
- **Integer** `groupId`: ID of Group that will be updated in contact list.
- **Function** `cb`: The callback function.


### `deleteContactGroup(groupId, cb)`
Delete Contact Group

#### Params

- **Integer** `groupId`: ID of Group that will be deleted in contact list.
- **Function** `cb`: The callback function.



### `getBalance(cb)`
Get SMS Balance

#### Params

- **Function** `cb`: The callback function.
