'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BufferLayout = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _webglTypes = require('./webgl-types');

var _webglChecks = require('./webgl-checks');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ERR_WEBGL2 = 'WebGL2 required';

// Encapsulates a WebGLBuffer object

var BufferLayout =
/**
 * @classdesc
 * Store characteristics of a data layout
 * This data can be used when updating vertex attributes with
 * the associated buffer, freeing the application from keeping
 * track of this metadata.
 *
 * @class
 * @param {GLuint} size - number of values per element (1-4)
 * @param {GLuint} type - type of values (e.g. gl.FLOAT)
 * @param {GLbool} normalized=false - normalize integers to [-1,1] or [0,1]
 * @param {GLuint} integer=false - WebGL2 only, int-to-float conversion
 * @param {GLuint} stride=0 - supports strided arrays
 * @param {GLuint} offset=0 - supports strided arrays
 */
exports.BufferLayout = function BufferLayout() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var type = _ref.type;
  var _ref$size = _ref.size;
  var size = _ref$size === undefined ? 1 : _ref$size;
  var _ref$offset = _ref.offset;
  var offset = _ref$offset === undefined ? 0 : _ref$offset;
  var _ref$stride = _ref.stride;
  var stride = _ref$stride === undefined ? 0 : _ref$stride;
  var _ref$normalized = _ref.normalized;
  var normalized = _ref$normalized === undefined ? false : _ref$normalized;
  var _ref$integer = _ref.integer;
  var integer = _ref$integer === undefined ? false : _ref$integer;
  var _ref$instanced = _ref.instanced;
  var instanced = _ref$instanced === undefined ? 0 : _ref$instanced;

  _classCallCheck(this, BufferLayout);

  this.type = type;
  this.size = size;
  this.offset = offset;
  this.stride = stride;
  this.normalized = normalized;
  this.integer = integer;
  this.instanced = instanced;
};

var Buffer = function () {
  _createClass(Buffer, null, [{
    key: 'makeFrom',


    /**
     * Returns a Buffer wrapped WebGLBuffer from a variety of inputs.
     * Allows other functions to transparently accept raw WebGLBuffers etc
     * and manipulate them using the methods in the `Buffer` class.
     * Checks for ".handle" (allows use of stack.gl's gl-buffer)
     *
     * @param {WebGLRenderingContext} gl - if a new buffer needs to be initialized
     * @param {*} object - candidate that will be coerced to a buffer
     * @returns {Buffer} - Buffer object that wraps the buffer parameter
     */
    value: function makeFrom(gl) {
      var object = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      return object instanceof Buffer ? object :
      // Use .handle (e.g from stack.gl's gl-buffer), else use buffer directly
      new Buffer(gl).setData({ handle: object.handle || object });
    }

    /*
     * @classdesc
     * Can be used to store vertex data, pixel data retrieved from images
     * or the framebuffer, and a variety of other things.
     *
     * Mainly used for uploading VertexAttributes to GPU
     * Setting data on a buffers (arrays) uploads it to the GPU.
     *
     * Holds an attribute name as a convenience...
     * setData - Initializes size of buffer and sets
     *
     * @param {WebGLRenderingContext} gl - gl context
     * @param {string} opt.id - id for debugging
     */

  }]);

  function Buffer() {
    var gl = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var id = _ref2.id;
    var handle = _ref2.handle;

    _classCallCheck(this, Buffer);

    (0, _webglChecks.assertWebGLRenderingContext)(gl);

    handle = handle || gl.createBuffer();
    if (!(handle instanceof _webglTypes.WebGLBuffer)) {
      throw new Error('Failed to create WebGLBuffer');
    }

    this.gl = gl;
    this.handle = handle;
    this.id = id;
    this.bytes = undefined;
    this.data = null;
    this.target = _webglTypes.GL.ARRAY_BUFFER;
    this.layout = null;

    this.userData = {};
    Object.seal(this);
  }

  _createClass(Buffer, [{
    key: 'delete',
    value: function _delete() {
      var gl = this.gl;

      if (this.handle) {
        gl.deleteBuffer(this.handle);
        this.handle = null;
      }
      return this;
    }

    /**
     * Creates and initializes the buffer object's data store.
     *
     * @param {ArrayBufferView} opt.data - contents
     * @param {GLsizeiptr} opt.bytes - the size of the buffer object's data store.
     * @param {GLenum} opt.usage=gl.STATIC_DRAW - Allocation hint for GPU driver
     *
     * Characteristics of stored data, hints for vertex attribute
     *
     * @param {GLenum} opt.dataType=gl.FLOAT - type of data stored in buffer
     * @param {GLuint} opt.size=1 - number of values per vertex
     * @returns {Buffer} Returns itself for chaining.
     */

  }, {
    key: 'setData',
    value: function setData() {
      var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var data = _ref3.data;
      var bytes = _ref3.bytes;
      var _ref3$target = _ref3.target;
      var target = _ref3$target === undefined ? _webglTypes.GL.ARRAY_BUFFER : _ref3$target;
      var _ref3$usage = _ref3.usage;
      var usage = _ref3$usage === undefined ? _webglTypes.GL.STATIC_DRAW : _ref3$usage;
      var layout = _ref3.layout;
      var type = _ref3.type;
      var _ref3$size = _ref3.size;
      var size = _ref3$size === undefined ? 1 : _ref3$size;
      var _ref3$offset = _ref3.offset;
      var offset = _ref3$offset === undefined ? 0 : _ref3$offset;
      var _ref3$stride = _ref3.stride;
      var stride = _ref3$stride === undefined ? 0 : _ref3$stride;
      var _ref3$normalized = _ref3.normalized;
      var normalized = _ref3$normalized === undefined ? false : _ref3$normalized;
      var _ref3$integer = _ref3.integer;
      var integer = _ref3$integer === undefined ? false : _ref3$integer;
      var _ref3$instanced = _ref3.instanced;
      var instanced = _ref3$instanced === undefined ? 0 : _ref3$instanced;
      var gl = this.gl;

      (0, _assert2.default)(data || bytes >= 0, 'Buffer.setData needs data or bytes');
      type = type || (0, _webglChecks.glTypeFromArray)(data);

      if (data) {
        (0, _webglChecks.assertArrayTypeMatch)(data, type, 'in Buffer.setData');
      }

      this.bytes = bytes;
      this.data = data;
      this.target = target;
      this.layout = layout || new BufferLayout({
        type: type,
        size: size,
        offset: offset,
        stride: stride,
        normalized: normalized,
        integer: integer,
        instanced: instanced
      });

      // Note: When we are just creating and/or filling the buffer with data,
      // the target we use doesn't technically matter, so use ARRAY_BUFFER
      // https://www.opengl.org/wiki/Buffer_Object
      this.bind({ target: target });
      gl.bufferData(target, data || bytes, usage);
      this.unbind({ target: target });

      return this;
    }

    /**
     * Updates a subset of a buffer object's data store.
     * @param {ArrayBufferView} opt.data - contents
     * @returns {Buffer} Returns itself for chaining.
     */

  }, {
    key: 'subData',
    value: function subData() {
      var _ref4 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var data = _ref4.data;
      var _ref4$offset = _ref4.offset;
      var offset = _ref4$offset === undefined ? 0 : _ref4$offset;
      var gl = this.gl;

      (0, _assert2.default)(data, 'Buffer.updateData needs data');

      // Note: When we are just creating and/or filling the buffer with data,
      // the target we use doesn't technically matter, so use ARRAY_BUFFER
      // https://www.opengl.org/wiki/Buffer_Object
      this.bind({ target: _webglTypes.GL.ARRAY_BUFFER });
      gl.bufferSubData(_webglTypes.GL.ARRAY_BUFFER, offset, data);
      this.unbind({ target: _webglTypes.GL.ARRAY_BUFFER });

      return this;
    }

    /**
     * Binds a buffer to a given binding point (target).
     *
     * @param {Glenum} target - target for the bind operation.
     *  Possible values: gl.TRANSFORM_FEEDBACK_BUFFER and gl.UNIFORM_BUFFER
     * @param {GLuint} index - the index of the target.
     * @returns {Buffer} - Returns itself for chaining.
     */

  }, {
    key: 'bind',
    value: function bind() {
      var _ref5 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref5$target = _ref5.target;
      var target = _ref5$target === undefined ? this.target : _ref5$target;

      this.gl.bindBuffer(target, this.handle);
      return this;
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      var _ref6 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref6$target = _ref6.target;
      var target = _ref6$target === undefined ? this.target : _ref6$target;

      // this.gl.bindBuffer(target, null);
      return this;
    }

    /**
     * Note: WEBGL2
     * Binds a buffer to a given binding point (target) at a given index.
     *
     * @param {Glenum} target - target for the bind operation.
     *  Possible values: gl.TRANSFORM_FEEDBACK_BUFFER and gl.UNIFORM_BUFFER
     * @param {GLuint} index - the index of the target.
     * @returns {Buffer} - Returns itself for chaining.
     */

  }, {
    key: 'bindBase',
    value: function bindBase() {
      var _ref7 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref7$target = _ref7.target;
      var target = _ref7$target === undefined ? this.target : _ref7$target;
      var index = _ref7.index;

      (0, _assert2.default)(this.gl instanceof _webglTypes.WebGL2RenderingContext, ERR_WEBGL2);
      this.gl.bindBufferBase(target, index, this.handle);
      return this;
    }
  }, {
    key: 'unbindBase',
    value: function unbindBase() {
      var _ref8 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref8$target = _ref8.target;
      var target = _ref8$target === undefined ? this.target : _ref8$target;
      var index = _ref8.index;

      (0, _assert2.default)(this.gl instanceof _webglTypes.WebGL2RenderingContext, ERR_WEBGL2);
      this.gl.bindBufferBase(target, index, null);
      return this;
    }

    /**
     * Note: WEBGL2
     * binds a range of a given WebGLBuffer to a given binding point (target)
     * at a given index.
     *
     * @param {Glenum} target - target for the bind operation.
     *  Possible values: gl.TRANSFORM_FEEDBACK_BUFFER and gl.UNIFORM_BUFFER
     * @param {GLuint} index - the index of the target.
     * @returns {Buffer} - Returns itself for chaining.
     */

  }, {
    key: 'bindRange',
    value: function bindRange() {
      var _ref9 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref9$target = _ref9.target;
      var target = _ref9$target === undefined ? this.target : _ref9$target;
      var index = _ref9.index;
      var _ref9$offset = _ref9.offset;
      var offset = _ref9$offset === undefined ? 0 : _ref9$offset;
      var size = _ref9.size;

      (0, _assert2.default)(this.gl instanceof _webglTypes.WebGL2RenderingContext, ERR_WEBGL2);
      this.gl.bindBufferRange(target, index, this.handle, offset, size);
      return this;
    }
  }, {
    key: 'unbindRange',
    value: function unbindRange() {
      var _ref10 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref10$target = _ref10.target;
      var target = _ref10$target === undefined ? this.target : _ref10$target;
      var index = _ref10.index;

      (0, _assert2.default)(this.gl instanceof _webglTypes.WebGL2RenderingContext, ERR_WEBGL2);
      this.gl.bindBufferBase(target, index, null);
      return this;
    }
  }]);

  return Buffer;
}();

exports.default = Buffer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJnbC9idWZmZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBRUE7Ozs7Ozs7O0FBRUEsSUFBTSxhQUFhLGlCQUFuQjs7QUFFQTs7SUFFYSxZO0FBQ1g7Ozs7Ozs7Ozs7Ozs7OztRQURXLFksR0FnQlgsd0JBU1E7QUFBQSxtRUFBSixFQUFJOztBQUFBLE1BUE4sSUFPTSxRQVBOLElBT007QUFBQSx1QkFOTixJQU1NO0FBQUEsTUFOTixJQU1NLDZCQU5DLENBTUQ7QUFBQSx5QkFMTixNQUtNO0FBQUEsTUFMTixNQUtNLCtCQUxHLENBS0g7QUFBQSx5QkFKTixNQUlNO0FBQUEsTUFKTixNQUlNLCtCQUpHLENBSUg7QUFBQSw2QkFITixVQUdNO0FBQUEsTUFITixVQUdNLG1DQUhPLEtBR1A7QUFBQSwwQkFGTixPQUVNO0FBQUEsTUFGTixPQUVNLGdDQUZJLEtBRUo7QUFBQSw0QkFETixTQUNNO0FBQUEsTUFETixTQUNNLGtDQURNLENBQ047O0FBQUE7O0FBQ04sT0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLE9BQUssSUFBTCxHQUFZLElBQVo7QUFDQSxPQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsT0FBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLE9BQUssVUFBTCxHQUFrQixVQUFsQjtBQUNBLE9BQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxPQUFLLFNBQUwsR0FBaUIsU0FBakI7QUFDRCxDOztJQUdrQixNOzs7OztBQUVuQjs7Ozs7Ozs7Ozs2QkFVZ0IsRSxFQUFpQjtBQUFBLFVBQWIsTUFBYSx5REFBSixFQUFJOztBQUMvQixhQUFPLGtCQUFrQixNQUFsQixHQUEyQixNQUEzQjtBQUNMO0FBQ0EsVUFBSSxNQUFKLENBQVcsRUFBWCxFQUFlLE9BQWYsQ0FBdUIsRUFBQyxRQUFRLE9BQU8sTUFBUCxJQUFpQixNQUExQixFQUF2QixDQUZGO0FBR0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBY0Esb0JB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QVEsY0FBUixDQUF1QixNQUF2QixFQUErQixLQUEvQixFQUFzQyxJQUF0QztBQUNBLGFBQU8sSUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7O2dDQVVnRTtBQUFBLHdFQUFKLEVBQUk7O0FBQUEsK0JBQXJELE1BQXFEO0FBQUEsVUFBckQsTUFBcUQsZ0NBQTVDLEtBQUssTUFBdUM7QUFBQSxVQUEvQixLQUErQixTQUEvQixLQUErQjtBQUFBLCtCQUF4QixNQUF3QjtBQUFBLFVBQXhCLE1BQXdCLGdDQUFmLENBQWU7QUFBQSxVQUFaLElBQVksU0FBWixJQUFZOztBQUM5RCw0QkFBTyxLQUFLLEVBQUwsOENBQVAsRUFBa0QsVUFBbEQ7QUFDQSxXQUFLLEVBQUwsQ0FBUSxlQUFSLENBQXdCLE1BQXhCLEVBQWdDLEtBQWhDLEVBQXVDLEtBQUssTUFBNUMsRUFBb0QsTUFBcEQsRUFBNEQsSUFBNUQ7QUFDQSxhQUFPLElBQVA7QUFDRDs7O2tDQUUrQztBQUFBLHlFQUFKLEVBQUk7O0FBQUEsaUNBQW5DLE1BQW1DO0FBQUEsVUFBbkMsTUFBbUMsaUNBQTFCLEtBQUssTUFBcUI7QUFBQSxVQUFiLEtBQWEsVUFBYixLQUFhOztBQUM5Qyw0QkFBTyxLQUFLLEVBQUwsOENBQVAsRUFBa0QsVUFBbEQ7QUFDQSxXQUFLLEVBQUwsQ0FBUSxjQUFSLENBQXVCLE1BQXZCLEVBQStCLEtBQS9CLEVBQXNDLElBQXRDO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7Ozs7OztrQkE1TWtCLE0iLCJmaWxlIjoiYnVmZmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHTCwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCwgV2ViR0xCdWZmZXJ9XG4gIGZyb20gJy4vd2ViZ2wtdHlwZXMnO1xuaW1wb3J0IHthc3NlcnRXZWJHTFJlbmRlcmluZ0NvbnRleHQsIGdsVHlwZUZyb21BcnJheSwgYXNzZXJ0QXJyYXlUeXBlTWF0Y2h9XG4gIGZyb20gJy4vd2ViZ2wtY2hlY2tzJztcbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcblxuY29uc3QgRVJSX1dFQkdMMiA9ICdXZWJHTDIgcmVxdWlyZWQnO1xuXG4vLyBFbmNhcHN1bGF0ZXMgYSBXZWJHTEJ1ZmZlciBvYmplY3RcblxuZXhwb3J0IGNsYXNzIEJ1ZmZlckxheW91dCB7XG4gIC8qKlxuICAgKiBAY2xhc3NkZXNjXG4gICAqIFN0b3JlIGNoYXJhY3RlcmlzdGljcyBvZiBhIGRhdGEgbGF5b3V0XG4gICAqIFRoaXMgZGF0YSBjYW4gYmUgdXNlZCB3aGVuIHVwZGF0aW5nIHZlcnRleCBhdHRyaWJ1dGVzIHdpdGhcbiAgICogdGhlIGFzc29jaWF0ZWQgYnVmZmVyLCBmcmVlaW5nIHRoZSBhcHBsaWNhdGlvbiBmcm9tIGtlZXBpbmdcbiAgICogdHJhY2sgb2YgdGhpcyBtZXRhZGF0YS5cbiAgICpcbiAgICogQGNsYXNzXG4gICAqIEBwYXJhbSB7R0x1aW50fSBzaXplIC0gbnVtYmVyIG9mIHZhbHVlcyBwZXIgZWxlbWVudCAoMS00KVxuICAgKiBAcGFyYW0ge0dMdWludH0gdHlwZSAtIHR5cGUgb2YgdmFsdWVzIChlLmcuIGdsLkZMT0FUKVxuICAgKiBAcGFyYW0ge0dMYm9vbH0gbm9ybWFsaXplZD1mYWxzZSAtIG5vcm1hbGl6ZSBpbnRlZ2VycyB0byBbLTEsMV0gb3IgWzAsMV1cbiAgICogQHBhcmFtIHtHTHVpbnR9IGludGVnZXI9ZmFsc2UgLSBXZWJHTDIgb25seSwgaW50LXRvLWZsb2F0IGNvbnZlcnNpb25cbiAgICogQHBhcmFtIHtHTHVpbnR9IHN0cmlkZT0wIC0gc3VwcG9ydHMgc3RyaWRlZCBhcnJheXNcbiAgICogQHBhcmFtIHtHTHVpbnR9IG9mZnNldD0wIC0gc3VwcG9ydHMgc3RyaWRlZCBhcnJheXNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHtcbiAgICAvLyBDaGFyYWN0ZXJpc3RpY3Mgb2Ygc3RvcmVkIGRhdGFcbiAgICB0eXBlLFxuICAgIHNpemUgPSAxLFxuICAgIG9mZnNldCA9IDAsXG4gICAgc3RyaWRlID0gMCxcbiAgICBub3JtYWxpemVkID0gZmFsc2UsXG4gICAgaW50ZWdlciA9IGZhbHNlLFxuICAgIGluc3RhbmNlZCA9IDBcbiAgfSA9IHt9KSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuICAgIHRoaXMuc3RyaWRlID0gc3RyaWRlO1xuICAgIHRoaXMubm9ybWFsaXplZCA9IG5vcm1hbGl6ZWQ7XG4gICAgdGhpcy5pbnRlZ2VyID0gaW50ZWdlcjtcbiAgICB0aGlzLmluc3RhbmNlZCA9IGluc3RhbmNlZDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWZmZXIge1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgQnVmZmVyIHdyYXBwZWQgV2ViR0xCdWZmZXIgZnJvbSBhIHZhcmlldHkgb2YgaW5wdXRzLlxuICAgKiBBbGxvd3Mgb3RoZXIgZnVuY3Rpb25zIHRvIHRyYW5zcGFyZW50bHkgYWNjZXB0IHJhdyBXZWJHTEJ1ZmZlcnMgZXRjXG4gICAqIGFuZCBtYW5pcHVsYXRlIHRoZW0gdXNpbmcgdGhlIG1ldGhvZHMgaW4gdGhlIGBCdWZmZXJgIGNsYXNzLlxuICAgKiBDaGVja3MgZm9yIFwiLmhhbmRsZVwiIChhbGxvd3MgdXNlIG9mIHN0YWNrLmdsJ3MgZ2wtYnVmZmVyKVxuICAgKlxuICAgKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2wgLSBpZiBhIG5ldyBidWZmZXIgbmVlZHMgdG8gYmUgaW5pdGlhbGl6ZWRcbiAgICogQHBhcmFtIHsqfSBvYmplY3QgLSBjYW5kaWRhdGUgdGhhdCB3aWxsIGJlIGNvZXJjZWQgdG8gYSBidWZmZXJcbiAgICogQHJldHVybnMge0J1ZmZlcn0gLSBCdWZmZXIgb2JqZWN0IHRoYXQgd3JhcHMgdGhlIGJ1ZmZlciBwYXJhbWV0ZXJcbiAgICovXG4gIHN0YXRpYyBtYWtlRnJvbShnbCwgb2JqZWN0ID0ge30pIHtcbiAgICByZXR1cm4gb2JqZWN0IGluc3RhbmNlb2YgQnVmZmVyID8gb2JqZWN0IDpcbiAgICAgIC8vIFVzZSAuaGFuZGxlIChlLmcgZnJvbSBzdGFjay5nbCdzIGdsLWJ1ZmZlciksIGVsc2UgdXNlIGJ1ZmZlciBkaXJlY3RseVxuICAgICAgbmV3IEJ1ZmZlcihnbCkuc2V0RGF0YSh7aGFuZGxlOiBvYmplY3QuaGFuZGxlIHx8IG9iamVjdH0pO1xuICB9XG5cbiAgLypcbiAgICogQGNsYXNzZGVzY1xuICAgKiBDYW4gYmUgdXNlZCB0byBzdG9yZSB2ZXJ0ZXggZGF0YSwgcGl4ZWwgZGF0YSByZXRyaWV2ZWQgZnJvbSBpbWFnZXNcbiAgICogb3IgdGhlIGZyYW1lYnVmZmVyLCBhbmQgYSB2YXJpZXR5IG9mIG90aGVyIHRoaW5ncy5cbiAgICpcbiAgICogTWFpbmx5IHVzZWQgZm9yIHVwbG9hZGluZyBWZXJ0ZXhBdHRyaWJ1dGVzIHRvIEdQVVxuICAgKiBTZXR0aW5nIGRhdGEgb24gYSBidWZmZXJzIChhcnJheXMpIHVwbG9hZHMgaXQgdG8gdGhlIEdQVS5cbiAgICpcbiAgICogSG9sZHMgYW4gYXR0cmlidXRlIG5hbWUgYXMgYSBjb252ZW5pZW5jZS4uLlxuICAgKiBzZXREYXRhIC0gSW5pdGlhbGl6ZXMgc2l6ZSBvZiBidWZmZXIgYW5kIHNldHNcbiAgICpcbiAgICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsIC0gZ2wgY29udGV4dFxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0LmlkIC0gaWQgZm9yIGRlYnVnZ2luZ1xuICAgKi9cbiAgY29uc3RydWN0b3IoZ2wgPSB7fSwge1xuICAgIGlkLFxuICAgIGhhbmRsZVxuICB9ID0ge30pIHtcbiAgICBhc3NlcnRXZWJHTFJlbmRlcmluZ0NvbnRleHQoZ2wpO1xuXG4gICAgaGFuZGxlID0gaGFuZGxlIHx8IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGlmICghKGhhbmRsZSBpbnN0YW5jZW9mIFdlYkdMQnVmZmVyKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIFdlYkdMQnVmZmVyJyk7XG4gICAgfVxuXG4gICAgdGhpcy5nbCA9IGdsO1xuICAgIHRoaXMuaGFuZGxlID0gaGFuZGxlO1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLmJ5dGVzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZGF0YSA9IG51bGw7XG4gICAgdGhpcy50YXJnZXQgPSBHTC5BUlJBWV9CVUZGRVI7XG4gICAgdGhpcy5sYXlvdXQgPSBudWxsO1xuXG4gICAgdGhpcy51c2VyRGF0YSA9IHt9O1xuICAgIE9iamVjdC5zZWFsKHRoaXMpO1xuICB9XG5cbiAgZGVsZXRlKCkge1xuICAgIGNvbnN0IHtnbH0gPSB0aGlzO1xuICAgIGlmICh0aGlzLmhhbmRsZSkge1xuICAgICAgZ2wuZGVsZXRlQnVmZmVyKHRoaXMuaGFuZGxlKTtcbiAgICAgIHRoaXMuaGFuZGxlID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbmQgaW5pdGlhbGl6ZXMgdGhlIGJ1ZmZlciBvYmplY3QncyBkYXRhIHN0b3JlLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyVmlld30gb3B0LmRhdGEgLSBjb250ZW50c1xuICAgKiBAcGFyYW0ge0dMc2l6ZWlwdHJ9IG9wdC5ieXRlcyAtIHRoZSBzaXplIG9mIHRoZSBidWZmZXIgb2JqZWN0J3MgZGF0YSBzdG9yZS5cbiAgICogQHBhcmFtIHtHTGVudW19IG9wdC51c2FnZT1nbC5TVEFUSUNfRFJBVyAtIEFsbG9jYXRpb24gaGludCBmb3IgR1BVIGRyaXZlclxuICAgKlxuICAgKiBDaGFyYWN0ZXJpc3RpY3Mgb2Ygc3RvcmVkIGRhdGEsIGhpbnRzIGZvciB2ZXJ0ZXggYXR0cmlidXRlXG4gICAqXG4gICAqIEBwYXJhbSB7R0xlbnVtfSBvcHQuZGF0YVR5cGU9Z2wuRkxPQVQgLSB0eXBlIG9mIGRhdGEgc3RvcmVkIGluIGJ1ZmZlclxuICAgKiBAcGFyYW0ge0dMdWludH0gb3B0LnNpemU9MSAtIG51bWJlciBvZiB2YWx1ZXMgcGVyIHZlcnRleFxuICAgKiBAcmV0dXJucyB7QnVmZmVyfSBSZXR1cm5zIGl0c2VsZiBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBzZXREYXRhKHtcbiAgICBkYXRhLFxuICAgIGJ5dGVzLFxuICAgIHRhcmdldCA9IEdMLkFSUkFZX0JVRkZFUixcbiAgICB1c2FnZSA9IEdMLlNUQVRJQ19EUkFXLFxuICAgIC8vIENoYXJhY3RlcmlzdGljcyBvZiBzdG9yZWQgZGF0YVxuICAgIGxheW91dCxcbiAgICB0eXBlLFxuICAgIHNpemUgPSAxLFxuICAgIG9mZnNldCA9IDAsXG4gICAgc3RyaWRlID0gMCxcbiAgICBub3JtYWxpemVkID0gZmFsc2UsXG4gICAgaW50ZWdlciA9IGZhbHNlLFxuICAgIGluc3RhbmNlZCA9IDBcbiAgfSA9IHt9KSB7XG4gICAgY29uc3Qge2dsfSA9IHRoaXM7XG4gICAgYXNzZXJ0KGRhdGEgfHwgYnl0ZXMgPj0gMCwgJ0J1ZmZlci5zZXREYXRhIG5lZWRzIGRhdGEgb3IgYnl0ZXMnKTtcbiAgICB0eXBlID0gdHlwZSB8fCBnbFR5cGVGcm9tQXJyYXkoZGF0YSk7XG5cbiAgICBpZiAoZGF0YSkge1xuICAgICAgYXNzZXJ0QXJyYXlUeXBlTWF0Y2goZGF0YSwgdHlwZSwgJ2luIEJ1ZmZlci5zZXREYXRhJyk7XG4gICAgfVxuXG4gICAgdGhpcy5ieXRlcyA9IGJ5dGVzO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5sYXlvdXQgPSBsYXlvdXQgfHwgbmV3IEJ1ZmZlckxheW91dCh7XG4gICAgICB0eXBlLFxuICAgICAgc2l6ZSxcbiAgICAgIG9mZnNldCxcbiAgICAgIHN0cmlkZSxcbiAgICAgIG5vcm1hbGl6ZWQsXG4gICAgICBpbnRlZ2VyLFxuICAgICAgaW5zdGFuY2VkXG4gICAgfSk7XG5cbiAgICAvLyBOb3RlOiBXaGVuIHdlIGFyZSBqdXN0IGNyZWF0aW5nIGFuZC9vciBmaWxsaW5nIHRoZSBidWZmZXIgd2l0aCBkYXRhLFxuICAgIC8vIHRoZSB0YXJnZXQgd2UgdXNlIGRvZXNuJ3QgdGVjaG5pY2FsbHkgbWF0dGVyLCBzbyB1c2UgQVJSQVlfQlVGRkVSXG4gICAgLy8gaHR0cHM6Ly93d3cub3BlbmdsLm9yZy93aWtpL0J1ZmZlcl9PYmplY3RcbiAgICB0aGlzLmJpbmQoe3RhcmdldH0pO1xuICAgIGdsLmJ1ZmZlckRhdGEodGFyZ2V0LCBkYXRhIHx8IGJ5dGVzLCB1c2FnZSk7XG4gICAgdGhpcy51bmJpbmQoe3RhcmdldH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBhIHN1YnNldCBvZiBhIGJ1ZmZlciBvYmplY3QncyBkYXRhIHN0b3JlLlxuICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyVmlld30gb3B0LmRhdGEgLSBjb250ZW50c1xuICAgKiBAcmV0dXJucyB7QnVmZmVyfSBSZXR1cm5zIGl0c2VsZiBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBzdWJEYXRhKHtcbiAgICBkYXRhLFxuICAgIG9mZnNldCA9IDBcbiAgfSA9IHt9KSB7XG4gICAgY29uc3Qge2dsfSA9IHRoaXM7XG4gICAgYXNzZXJ0KGRhdGEsICdCdWZmZXIudXBkYXRlRGF0YSBuZWVkcyBkYXRhJyk7XG5cbiAgICAvLyBOb3RlOiBXaGVuIHdlIGFyZSBqdXN0IGNyZWF0aW5nIGFuZC9vciBmaWxsaW5nIHRoZSBidWZmZXIgd2l0aCBkYXRhLFxuICAgIC8vIHRoZSB0YXJnZXQgd2UgdXNlIGRvZXNuJ3QgdGVjaG5pY2FsbHkgbWF0dGVyLCBzbyB1c2UgQVJSQVlfQlVGRkVSXG4gICAgLy8gaHR0cHM6Ly93d3cub3BlbmdsLm9yZy93aWtpL0J1ZmZlcl9PYmplY3RcbiAgICB0aGlzLmJpbmQoe3RhcmdldDogR0wuQVJSQVlfQlVGRkVSfSk7XG4gICAgZ2wuYnVmZmVyU3ViRGF0YShHTC5BUlJBWV9CVUZGRVIsIG9mZnNldCwgZGF0YSk7XG4gICAgdGhpcy51bmJpbmQoe3RhcmdldDogR0wuQVJSQVlfQlVGRkVSfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kcyBhIGJ1ZmZlciB0byBhIGdpdmVuIGJpbmRpbmcgcG9pbnQgKHRhcmdldCkuXG4gICAqXG4gICAqIEBwYXJhbSB7R2xlbnVtfSB0YXJnZXQgLSB0YXJnZXQgZm9yIHRoZSBiaW5kIG9wZXJhdGlvbi5cbiAgICogIFBvc3NpYmxlIHZhbHVlczogZ2wuVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUiBhbmQgZ2wuVU5JRk9STV9CVUZGRVJcbiAgICogQHBhcmFtIHtHTHVpbnR9IGluZGV4IC0gdGhlIGluZGV4IG9mIHRoZSB0YXJnZXQuXG4gICAqIEByZXR1cm5zIHtCdWZmZXJ9IC0gUmV0dXJucyBpdHNlbGYgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgYmluZCh7dGFyZ2V0ID0gdGhpcy50YXJnZXR9ID0ge30pIHtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXIodGFyZ2V0LCB0aGlzLmhhbmRsZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB1bmJpbmQoe3RhcmdldCA9IHRoaXMudGFyZ2V0fSA9IHt9KSB7XG4gICAgLy8gdGhpcy5nbC5iaW5kQnVmZmVyKHRhcmdldCwgbnVsbCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogTm90ZTogV0VCR0wyXG4gICAqIEJpbmRzIGEgYnVmZmVyIHRvIGEgZ2l2ZW4gYmluZGluZyBwb2ludCAodGFyZ2V0KSBhdCBhIGdpdmVuIGluZGV4LlxuICAgKlxuICAgKiBAcGFyYW0ge0dsZW51bX0gdGFyZ2V0IC0gdGFyZ2V0IGZvciB0aGUgYmluZCBvcGVyYXRpb24uXG4gICAqICBQb3NzaWJsZSB2YWx1ZXM6IGdsLlRSQU5TRk9STV9GRUVEQkFDS19CVUZGRVIgYW5kIGdsLlVOSUZPUk1fQlVGRkVSXG4gICAqIEBwYXJhbSB7R0x1aW50fSBpbmRleCAtIHRoZSBpbmRleCBvZiB0aGUgdGFyZ2V0LlxuICAgKiBAcmV0dXJucyB7QnVmZmVyfSAtIFJldHVybnMgaXRzZWxmIGZvciBjaGFpbmluZy5cbiAgICovXG4gIGJpbmRCYXNlKHt0YXJnZXQgPSB0aGlzLnRhcmdldCwgaW5kZXh9ID0ge30pIHtcbiAgICBhc3NlcnQodGhpcy5nbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQsIEVSUl9XRUJHTDIpO1xuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlckJhc2UodGFyZ2V0LCBpbmRleCwgdGhpcy5oYW5kbGUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdW5iaW5kQmFzZSh7dGFyZ2V0ID0gdGhpcy50YXJnZXQsIGluZGV4fSA9IHt9KSB7XG4gICAgYXNzZXJ0KHRoaXMuZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0LCBFUlJfV0VCR0wyKTtcbiAgICB0aGlzLmdsLmJpbmRCdWZmZXJCYXNlKHRhcmdldCwgaW5kZXgsIG51bGwpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vdGU6IFdFQkdMMlxuICAgKiBiaW5kcyBhIHJhbmdlIG9mIGEgZ2l2ZW4gV2ViR0xCdWZmZXIgdG8gYSBnaXZlbiBiaW5kaW5nIHBvaW50ICh0YXJnZXQpXG4gICAqIGF0IGEgZ2l2ZW4gaW5kZXguXG4gICAqXG4gICAqIEBwYXJhbSB7R2xlbnVtfSB0YXJnZXQgLSB0YXJnZXQgZm9yIHRoZSBiaW5kIG9wZXJhdGlvbi5cbiAgICogIFBvc3NpYmxlIHZhbHVlczogZ2wuVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUiBhbmQgZ2wuVU5JRk9STV9CVUZGRVJcbiAgICogQHBhcmFtIHtHTHVpbnR9IGluZGV4IC0gdGhlIGluZGV4IG9mIHRoZSB0YXJnZXQuXG4gICAqIEByZXR1cm5zIHtCdWZmZXJ9IC0gUmV0dXJucyBpdHNlbGYgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgYmluZFJhbmdlKHt0YXJnZXQgPSB0aGlzLnRhcmdldCwgaW5kZXgsIG9mZnNldCA9IDAsIHNpemV9ID0ge30pIHtcbiAgICBhc3NlcnQodGhpcy5nbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQsIEVSUl9XRUJHTDIpO1xuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlclJhbmdlKHRhcmdldCwgaW5kZXgsIHRoaXMuaGFuZGxlLCBvZmZzZXQsIHNpemUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdW5iaW5kUmFuZ2Uoe3RhcmdldCA9IHRoaXMudGFyZ2V0LCBpbmRleH0gPSB7fSkge1xuICAgIGFzc2VydCh0aGlzLmdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCwgRVJSX1dFQkdMMik7XG4gICAgdGhpcy5nbC5iaW5kQnVmZmVyQmFzZSh0YXJnZXQsIGluZGV4LCBudWxsKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG59XG4iXX0=