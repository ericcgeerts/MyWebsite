// CloudFront Function (viewer request, cloudfront-js-2.0) for ericconnelly.me.
// Sends every alias host to https://ericconnelly.me and permanently redirects
// retired or duplicate paths to their canonical URL.
var REDIRECTS = {
  "/index.html": "/",
  "/index-modern.html": "/",
  "/index-old.html": "/",
  "/now": "/now.html",
  "/now/": "/now.html",
};

function queryString(query) {
  var parts = [];

  for (var key in query) {
    var item = query[key];
    var values = item.multiValue || [item];

    for (var i = 0; i < values.length; i++) {
      var value = values[i].value;
      parts.push(
        encodeURIComponent(key) +
          (value === "" ? "" : "=" + encodeURIComponent(value))
      );
    }
  }

  return parts.length ? "?" + parts.join("&") : "";
}

function redirect(location) {
  return {
    statusCode: 301,
    statusDescription: "Moved Permanently",
    headers: {
      location: {
        value: location,
      },
      "cache-control": {
        value: "public, max-age=3600",
      },
    },
  };
}

function handler(event) {
  var request = event.request;
  var host = request.headers.host.value.toLowerCase();
  var target = REDIRECTS[request.uri.toLowerCase()];

  if (host !== "ericconnelly.me" || target) {
    return redirect(
      "https://ericconnelly.me" +
        (target || request.uri) +
        queryString(request.querystring)
    );
  }

  return request;
}
