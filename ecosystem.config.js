module.exports = {
    apps: [
        {
            name: "nestj-app",
            script: "npm",
            args: "run start:dev",
            watch: ["src"],
            ignore_watch: ["node_modules", "dist", "logs"],
            env: {
                NODE_ENV: "development"
            }
        }
    ]
};
