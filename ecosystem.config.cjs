module.exports = {
  apps: [
    {
      name: "gazsnab",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3002",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env_file: ".env",
      env: {
        NODE_ENV: "production",
        PORT: 3002
      }
    }
  ]
};
