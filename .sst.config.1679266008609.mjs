import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// stacks/ApiStack.js
import { Api } from "sst/constructs";
function API({ stack }) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/lambda.handler"
    }
  });
  stack.addOutputs({
    ApiEndpoint: api.url
  });
  return {
    api
  };
}
__name(API, "API");

// sst.config.js
var sst_config_default = {
  config(_input) {
    return {
      name: "gamejorney",
      region: "us-east-1"
    };
  },
  stacks(app) {
    app.stack(API);
  }
};
export {
  sst_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RhY2tzL0FwaVN0YWNrLmpzIiwgInNzdC5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IEFwaSB9IGZyb20gXCJzc3QvY29uc3RydWN0c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gQVBJKHsgc3RhY2sgfSkge1xuICBjb25zdCBhcGkgPSBuZXcgQXBpKHN0YWNrLCBcImFwaVwiLCB7XG4gICAgcm91dGVzOiB7XG4gICAgICBcIkdFVCAvXCI6IFwicGFja2FnZXMvZnVuY3Rpb25zL3NyYy9sYW1iZGEuaGFuZGxlclwiLFxuICAgIH0sXG4gIH0pO1xuICBzdGFjay5hZGRPdXRwdXRzKHtcbiAgICBBcGlFbmRwb2ludDogYXBpLnVybCxcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBhcGksXG4gIH07XG59IiwgIlxuaW1wb3J0IHsgQVBJIH0gZnJvbSBcIi4vc3RhY2tzL0FwaVN0YWNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnKF9pbnB1dCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBcImdhbWVqb3JuZXlcIixcbiAgICAgIHJlZ2lvbjogXCJ1cy1lYXN0LTFcIixcbiAgICB9O1xuICB9LFxuICBzdGFja3MoYXBwKSB7XG4gICAgYXBwLnN0YWNrKEFQSSk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7O0FBQUEsU0FBUyxXQUFXO0FBRWIsU0FBUyxJQUFJLEVBQUUsTUFBTSxHQUFHO0FBQzdCLFFBQU0sTUFBTSxJQUFJLElBQUksT0FBTyxPQUFPO0FBQUEsSUFDaEMsUUFBUTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ1g7QUFBQSxFQUNGLENBQUM7QUFDRCxRQUFNLFdBQVc7QUFBQSxJQUNmLGFBQWEsSUFBSTtBQUFBLEVBQ25CLENBQUM7QUFFRCxTQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFDRjtBQWJnQjs7O0FDQ2hCLElBQU8scUJBQVE7QUFBQSxFQUNiLE9BQU8sUUFBUTtBQUNiLFdBQU87QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTyxLQUFLO0FBQ1YsUUFBSSxNQUFNLEdBQUc7QUFBQSxFQUNmO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
