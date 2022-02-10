const mongoose = require("mongoose");
const { generateIdSync } = require("utils/helper");
const {
  insert,
  getList,
  getDetail,
  createNotExistOrUpdate,
  updateOnly,
  deleteSelected,
  pushManyIntoArray,
} = require("utils/mongo.helper");

/**
 *
 * @param {mongoose.Schema} schema
 * @param {String} fields Public fields, divided by comma
 */
module.exports.uid = (length = 8) => (schema, options) => {
  schema.add({
    id: {
      type: String
    },
  });
  schema.pre("save", function (next) {
    if (schema.paths._id && schema.paths._id.instance === "String") {
      this.id = this._id || generateIdSync(length);
      this._id = this._id || this.id;
    } else this.id = this.id || generateIdSync(length);
    next();
  });
};

/**
 *
 * @param {mongoose.Schema} schema
 * @param {String} fields Public fields, divided by comma
 */
module.exports.selectFields = (fields = "*") => (schema, options) => {
  schema.statics.fields = fields;
};

/**
 *
 * @param {mongoose.Schema} schema
 * @param {Object} options
 */
module.exports.insert = (schema, options) => {
  schema.statics.insert = insert;
};

/**
 *
 * @param {mongoose.Schema} schema
 * @param {Object} options
 */
module.exports.getList = (schema, options) => {
  schema.statics.getList = getList;
};

/**
 *
 * @param {mongoose.Schema} schema
 * @param {Object} options
 */
module.exports.getDetail = (schema, options) => {
  schema.statics.getDetail = getDetail;
};

/**
 *
 * @param {mongoose.Schema} schema
 * @param {Object} options
 */
module.exports.createNotExistOrUpdate = (schema, options) => {
  schema.statics.createNotExistOrUpdate = createNotExistOrUpdate;
};

/**
 *
 * @param {mongoose.Schema} schema
 * @param {Object} options
 */
module.exports.updateOnly = (schema, options) => {
  schema.statics.updateOnly = updateOnly;
};

/**
 *
 * @param {mongoose.Schema} schema
 * @param {Object} options
 */
module.exports.deleteSelected = (schema, options) => {
  schema.statics.deleteSelected = deleteSelected;
};

/**
 *
 * @param {mongoose.Schema} schema
 * @param {Object} options
 */
module.exports.pushManyIntoArray = (schema, options) => {
  schema.statics.pushManyIntoArray = pushManyIntoArray;
};

/**
 *
 * @param {mongoose.Schema} schema
 * @param {Array<{path,select}>} paths Public fields, divided by comma
 */
module.exports.autoPopulate = (paths = []) => (schema, options) => {
  function ap(next) {
    this.populate(paths); //.execPopulate()
    next();
  }

  schema.pre("find", ap);
  schema.pre("findOne", ap);
};
