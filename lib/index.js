"use strict";

const request = require("request")
    , querystring = require("querystring")
    ;

module.exports = class ISMSPH {
    /**
     * ISMSPH
     * Creates the instance of the `ISMSPH` class.
     *
     * @name ISMSPH
     * @function
     * @param {Object} options An object containing:
     *
     *  - `username` (String): iSMS Philippines username (mandatory).
     *  - `password` (String): iSMS Philippines password. (mandatory).
     *  - `host` (String): iSMS Philippines api host (default: `https://www.isms.com.my/`).
     */
    constructor (options) {
        this.options = options;
        this.username = options.username;
        this.password = options.password;
        this.host = options.host || "https://www.isms.com.my/";
    }

    /**
     * sendMessage
     * Send a message to single destination.
     *
     * @name sendMessage
     * @function
     * @param {Object} params The iSMS API parameters (documented [here](https://www.bulksms.com.ph/bulk-sms-philippines-api.php)).
     * @param {Function} cb The callback function.
     */
    sendMessage (params, cb) {
        return this._request({
            url: "isms_send.php"
          , method: "GET"
          , params: params
        }, cb);
    }

    /**
     * sendMessageByGroupId
     * Send SMS by Group ID
     *
     * @name sendMessageByGroupId
     * @function
     * @param {Object} params The iSMS API parameters (documented [here](https://www.bulksms.com.ph/bulk-sms-philippines-api.php)).
     * @param {Function} cb The callback function.
     */
    sendMessageByGroupId (params, cb) {
        return this._request({
            url: "api_send_sms_by_group.php"
          , method: "GET"
          , params: params
        }, cb);
    }
    
    /**
     * sendMessageByRecipientName
     * Send SMS by Recipient Name 
     *
     * @name sendMessageByRecipientName
     * @function
     * @param {Object} params The iSMS API parameters (documented [here](https://www.bulksms.com.ph/bulk-sms-philippines-api.php)).
     * @param {Function} cb The callback function.
     */
    sendMessageByRecipientName (params, cb) {
        return this._request({
            url: "api_send_sms_by_group.php"
          , method: "GET"
          , params: params
        }, cb);
    }


    /**
     * getContactListGroup
     * Get Contact List Group 
     *
     * @name getContactListGroup
     * @function
     * @param {Function} cb The callback function.
     */
    getContactListGroup (cb) {
        return this._request({
            url: "api_list_of_contact_group.php"
          , method: "GET"
        }, cb);
    }

    /**
     * getContactListGroup
     * Get Contact List Based on the Group ID 
     *
     * @name getContactListGroup
     * @function
     * @param {Integer} groupId ID of Group in contact list.
     * @param {Function} cb The callback function.
     */
    getContactListByGroupId (groupId, cb) {
        return this._request({
            url: "api_list_of_contact_group.php"
          , method: "GET"
          , params: {
            groupid: groupId
          }
        }, cb);
    }


    /**
     * getContactList
     * Get All Contact List from Phone Book 
     *
     * @name getContactList
     * @function
     * @param {Function} cb The callback function.
     */
    getContactList(cb) {
        return this._request({
            url: "api_list_of_contact.php"
          , method: "GET"
        }, cb);
    }


    /**
     * createContactGroup
     * Create New Contact Group
     *
     * @name getContactList
     * @function
     * @param {String} groupName The name of group that will be created.
     * @param {Function} cb The callback function.
     */
    createContactGroup(groupName, cb) {
        return this._request({
            url: "api_add_contact_group.php"
          , method: "GET"
          , params: {
            name: groupName
          }
        }, cb);
    }


    /**
     * updateContactGroup
     * Update Group Name
     *
     * @name updateContactGroup
     * @function
     * @param {String} groupName The new name of group the group.
     * @param {Integer} groupId ID of Group that will be updated in contact list.
     * @param {Function} cb The callback function.
     */
    updateContactGroup(groupName, groupId, cb) {
        return this._request({
            url: "api_edit_contact_group.php"
          , method: "GET"
          , params: {
            name: groupName,
            groupid: groupId
          }
        }, cb);
    }


    /**
     * deleteContactGroup
     * Delete Group Name
     *
     * @name deleteContactGroup
     * @function
     * @param {Integer} groupId ID of Group that will be deleted in contact list.
     * @param {Function} cb The callback function.
     */
    deleteContactGroup(groupId, cb) {
        return this._request({
            url: "api_delete_contact_group.php"
          , method: "GET"
          , params: {
            groupid: groupId
          }
        }, cb);
    }


    /**
     * getBalance
     * Get SMS Balance
     *
     * @name getBalance
     * @function
     * @param {Function} cb The callback function.
     */
    getBalance(cb) {
        return this._request({
            url: "isms_balance.php"
          , method: "GET"
        }, cb);
    }

    /**
     * _parseResponse
     * This is called internally.
     *
     * @name _parseResponse
     * @function
     * @param {String} body The response body.
     * @returns {Object} Object of parsed response, string if unparsed.
     */
    _parseResponse (body, cb) {

        if ( body.includes('2000') ) {
            return {
                code: 2000,
                message: 'SUCCESS',
                details: 'Message Sent.'
            }
        }else if ( body.includes('1000') ) {
            return {
                code: 1000,
                message: 'UNKNOWN ERROR',
                details: 'Unknown error. Please contact the administrator.'
            }
        }
        else if ( body.includes('1001') ) {
            return {
                code: 1001,
                message: 'AUTHENTICATION FAILED',
                details: 'Your username or password are incorrect.'
            }
        }
        else if ( body.includes('1002') ) {
            return {
                code: 1002,
                message: 'ACCOUNT SUSPENDED / EXPIRED',
                details: 'Your account has been expired or suspended. Please contact the administrator.'
            }
        }
        else if ( body.includes('1003') ) {
            return {
                code: 1003,
                message: 'IP NOT ALLOWED',
                details: 'Your IP is not allowed to send SMS. Please contact the administrator.'
            }
        }
        else if ( body.includes('1004') ) {
            return {
                code: 1004,
                message: 'INSUFFICIENT CREDITS',
                details: 'You have run our of credits. Please reload your credits.'
            }
        }
        else if ( body.includes('1005') ) {
            return {
                code: 1005,
                message: 'INVALID SMS TYPE',
                details: 'Your SMS type is not supported.'
            }
        }
        else if ( body.includes('1006') ) {
            return {
                code: 1006,
                message: 'INVALID BODY LENGTH (1-900)',
                details: 'Your SMS body has exceed the length.  Max limit = 900'
            }
        }
        else if ( body.includes('1007') ) {
            return {
                code: 1007,
                message: 'INVALID HEX BODY',
                details: 'Your Hex body format is wrong.'
            }
        }
        else if ( body.includes('1008') ) {
            return {
                code: 1008,
                message: 'MISSING PARAMETER',
                details: 'One or more required parameters are missing.'
            }
        }else
            return body;

    }



    /**
     * _request
     * Low level function for making requests to the API endpoints.
     *
     * @name _request
     * @function
     * @param {Object} options An object containing the following fields:
     *
     *  - `url` (String): The api endpoint.
     *  - `method` (String): The request method (default: `get`).
     *  - `params` (Object): The params object.
     *  - `data` (Object): The POST data object.
     *  - `version` (String): API Version. If not specified your pinned verison is used.
     *
     * @param {Function} cb The callback function.
     */
    _request (options, cb) {
        if(options.params)
          Object.assign(options.params,{
            un: this.username,
            pwd: this.password
          })


        let _url = options.url
          , method = options.method || "get"
          , params = options.params || { un: this.username, pwd: this.password}
          , data = options.data
          , version = options.version || this.version || ""
          , qs = querystring.stringify(params)
          , removeTrailingSlash = options.removeTrailingSlash || false
          , url = this.host + version + "/"  + _url + (removeTrailingSlash ? "" : "/") + (qs ? "?" + qs : "")
          ;

        return request({
            url: url
          , method: method
          , headers: {
             'Content-Type': 'application/json'
            }
          , json: data ? data : true
        }, (err, res) => {
            const data = this._parseResponse(res.body.toString() || '');
            if (data.code && data.code!=2000 ) {
                err = new Error(data.details);
                err.code = data.code;
                err.name = data.message;
                return cb(err, null, res);
            }
            cb(err, data, res);

        })
    }
};