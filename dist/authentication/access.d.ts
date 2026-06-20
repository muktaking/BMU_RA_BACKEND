export declare const ac: {
    newRole<const TRoleStatements extends import("better-auth/plugins/access").Statements>(statements: import("better-auth/plugins/access").RoleInput<{
        readonly user: readonly ["create", "list", "set-role", "ban", "delete"];
        readonly session: readonly ["list", "revoke"];
        readonly articles: readonly ["create", "read", "edit", "delete"];
        readonly scales: readonly ["create", "read", "edit", "delete"];
        readonly researchers: readonly ["create", "read", "edit", "delete"];
    }, TRoleStatements>): import("better-auth/plugins/access").Role<import("better-auth/plugins/access").ExactRoleStatements<TRoleStatements>, {
        readonly user: readonly ["create", "list", "set-role", "ban", "delete"];
        readonly session: readonly ["list", "revoke"];
        readonly articles: readonly ["create", "read", "edit", "delete"];
        readonly scales: readonly ["create", "read", "edit", "delete"];
        readonly researchers: readonly ["create", "read", "edit", "delete"];
    }>;
    statements: {
        readonly user: readonly ["create", "list", "set-role", "ban", "delete"];
        readonly session: readonly ["list", "revoke"];
        readonly articles: readonly ["create", "read", "edit", "delete"];
        readonly scales: readonly ["create", "read", "edit", "delete"];
        readonly researchers: readonly ["create", "read", "edit", "delete"];
    };
};
export declare const roles: {
    admin: import("better-auth/plugins/access").Role<import("better-auth/plugins/access").ExactRoleStatements<{
        readonly user: ["create", "list", "set-role", "ban", "delete"];
        readonly session: ["list", "revoke"];
        readonly articles: ["create", "read", "edit", "delete"];
        readonly scales: ["create", "read", "edit", "delete"];
        readonly researchers: ["create", "read", "edit", "delete"];
    }>, {
        readonly user: readonly ["create", "list", "set-role", "ban", "delete"];
        readonly session: readonly ["list", "revoke"];
        readonly articles: readonly ["create", "read", "edit", "delete"];
        readonly scales: readonly ["create", "read", "edit", "delete"];
        readonly researchers: readonly ["create", "read", "edit", "delete"];
    }>;
    coordinator: import("better-auth/plugins/access").Role<import("better-auth/plugins/access").ExactRoleStatements<{
        readonly user: ["list", "ban"];
        readonly articles: ["create", "read", "edit", "delete"];
        readonly scales: ["create", "read", "edit", "delete"];
        readonly researchers: ["create", "read", "edit", "delete"];
    }>, {
        readonly user: readonly ["create", "list", "set-role", "ban", "delete"];
        readonly session: readonly ["list", "revoke"];
        readonly articles: readonly ["create", "read", "edit", "delete"];
        readonly scales: readonly ["create", "read", "edit", "delete"];
        readonly researchers: readonly ["create", "read", "edit", "delete"];
    }>;
    moderator: import("better-auth/plugins/access").Role<import("better-auth/plugins/access").ExactRoleStatements<{
        readonly user: ["list"];
        readonly articles: ["create", "read", "edit", "delete"];
        readonly scales: ["create", "read", "edit", "delete"];
        readonly researchers: ["create", "read", "edit", "delete"];
    }>, {
        readonly user: readonly ["create", "list", "set-role", "ban", "delete"];
        readonly session: readonly ["list", "revoke"];
        readonly articles: readonly ["create", "read", "edit", "delete"];
        readonly scales: readonly ["create", "read", "edit", "delete"];
        readonly researchers: readonly ["create", "read", "edit", "delete"];
    }>;
    researcher: import("better-auth/plugins/access").Role<import("better-auth/plugins/access").ExactRoleStatements<{
        readonly articles: ["create", "read", "edit"];
        readonly scales: ["create", "read", "edit"];
        readonly researchers: ["create", "read", "edit"];
    }>, {
        readonly user: readonly ["create", "list", "set-role", "ban", "delete"];
        readonly session: readonly ["list", "revoke"];
        readonly articles: readonly ["create", "read", "edit", "delete"];
        readonly scales: readonly ["create", "read", "edit", "delete"];
        readonly researchers: readonly ["create", "read", "edit", "delete"];
    }>;
    member: import("better-auth/plugins/access").Role<import("better-auth/plugins/access").ExactRoleStatements<{
        readonly articles: ["read"];
        readonly scales: ["read"];
        readonly researchers: ["read"];
    }>, {
        readonly user: readonly ["create", "list", "set-role", "ban", "delete"];
        readonly session: readonly ["list", "revoke"];
        readonly articles: readonly ["create", "read", "edit", "delete"];
        readonly scales: readonly ["create", "read", "edit", "delete"];
        readonly researchers: readonly ["create", "read", "edit", "delete"];
    }>;
    guest: import("better-auth/plugins/access").Role<import("better-auth/plugins/access").ExactRoleStatements<{
        readonly articles: ["read"];
        readonly scales: ["read"];
        readonly researchers: ["read"];
    }>, {
        readonly user: readonly ["create", "list", "set-role", "ban", "delete"];
        readonly session: readonly ["list", "revoke"];
        readonly articles: readonly ["create", "read", "edit", "delete"];
        readonly scales: readonly ["create", "read", "edit", "delete"];
        readonly researchers: readonly ["create", "read", "edit", "delete"];
    }>;
};
export type Roles = keyof typeof roles;
