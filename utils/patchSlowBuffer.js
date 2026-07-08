import { createRequire } from "module";
const require = createRequire(import.meta.url);
const buffer = require("buffer");

if (!buffer.SlowBuffer) {
  buffer.SlowBuffer = function SlowBuffer() {};
  buffer.SlowBuffer.prototype = { equal: () => {} };
}
