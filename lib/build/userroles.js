"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var userroles = require("supertokens-web-js/recipe/userroles");

class UserRoleAPIWrapper {
    static PermissionClaim = userroles.PermissionClaim;
    static UserRoleClaim = userroles.UserRoleClaim;
}

Object.defineProperty(exports, "PermissionClaim", {
    enumerable: true,
    get: function () {
        return userroles.PermissionClaim;
    },
});
Object.defineProperty(exports, "UserRoleClaim", {
    enumerable: true,
    get: function () {
        return userroles.UserRoleClaim;
    },
});
exports.default = UserRoleAPIWrapper;
