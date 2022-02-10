const messages = require("config/messages");

/**
 * Create a document
 * @param {Object} obj Data
 * @param {(err, res) => {}} cb Callback
 */
module.exports.insert = function (obj, cb = null) {
  return new Promise((resolve, reject) => {
    try {
      this.create(obj)
        .then((doc) => {
          if (cb) resolve(cb(null, doc));
          else resolve(doc);
        })
        .catch((err) => {
          if (cb) resolve(cb(err));
          else reject(err);
        });
    } catch (error) {
      if (cb) resolve(cb(error));
      else reject(error);
    }
  });
};

/**
 * Get list
 * @param {Object} cond Filter
 * @param {Object} options
 * @param {(err, res) => {}} cb Callback
 */
module.exports.getList = function (cond = {}, options = {}, cb = null) {
  return new Promise((resolve, reject) => {
    try {
      const publicFields = this.fields;
      const conds = cond || {};
      const { sort, fields, pagination } = options || {};
      let selectedFields = [];
      let pagingOption = {};

      let offset, page, limit;
      if (pagination) {
        offset = pagination.offset;
        page = pagination.page;
        limit = pagination.limit || 10;
        if (offset || page) {
          pagingOption = {
            skip: offset || (page - 1) * limit,
            limit,
          };
        }
      }

      if (fields) {
        selectedFields = fields.split(",");
        if (publicFields !== "*") {
          const defaultSelectedFields = publicFields.split(",");
          selectedFields = selectedFields.filter((f) =>
            defaultSelectedFields.includes(f)
          );
        } else selectedFields = selectedFields;
      } else
        selectedFields = publicFields !== "*" ? publicFields.split(",") : [];
      // selectedFields = ['-_id', ...selectedFields]

      this.find(
        {
          ...conds,
          active: true,
        },
        [],
        {
          sort: sort || { createdAt: -1 },
          ...pagingOption,
        },
        async (err, res) => {
          if (err) {
            if (cb) resolve(cb(err));
            else reject(err);
          } else {
            res = res.map((r) =>
              selectedFields.reduce((obj, sf) => {
                obj[sf] = r[sf];
                return obj;
              }, {})
            );
            let meta = {};
            if (offset || page) {
              if (offset) meta.offset = offset;
              if (page) meta.page = page;
              if (limit) meta.limit = limit;
              const total = await this.countDocuments({
                ...conds,
                active: true,
              }).exec();
              meta.total = total;
              meta.pages =
                Math.floor(total / limit) + (total % limit > 0 ? 1 : 0);
            }
            if (cb)
              resolve(
                cb(null, {
                  ...meta,
                  docs: res,
                })
              );
            else
              resolve({
                ...meta,
                docs: res,
              });
          }
        }
      );
    } catch (error) {
      if (cb) resolve(cb(error));
      else reject(error);
    }
  });
};

/**
 * Get detail
 * @param {Object} cond Filter
 * @param {Object} options
 * @param {(err, res) => {}} cb Callback
 */
module.exports.getDetail = function (cond = {}, options = {}, cb = null) {
  return new Promise((resolve, reject) => {
    try {
      const publicFields = this.fields;
      const conds = cond || {};
      const { fields } = options || {};
      let selectedFields = [];

      if (fields) {
        selectedFields = fields.split(",");
        if (publicFields !== "*") {
          const defaultSelectedFields = publicFields.split(",");
          selectedFields = selectedFields.filter((f) =>
            defaultSelectedFields.includes(f)
          );
        } else selectedFields = selectedFields;
      } else
        selectedFields = publicFields !== "*" ? publicFields.split(",") : [];
      // selectedFields = ['-_id', ...selectedFields]

      this.findOne(conds, [], (err, res) => {
        if (err) {
          if (cb) resolve(cb(err));
          else reject(err);
        } else {
          if (!res) return resolve()
          res = selectedFields.reduce((obj, sf) => {
            obj[sf] = res[sf];
            return obj;
          }, {});
          if (cb) resolve(cb(null, res));
          else resolve(res);
        }
      });
    } catch (error) {
      if (cb) resolve(cb(error));
      else reject(error);
    }
  });
};

/**
 * Partial update
 * @param {Object} cond Filter
 * @param {Object} update Fields to update
 * @param {Object} options
 * @param {(err, res) => {}} cb Callback
 */
module.exports.createNotExistOrUpdate = function (
  cond = {},
  update,
  options = {},
  cb = null
) {
  return new Promise((resolve, reject) => {
    try {
      let edited = {};
      edited = update;

      this.findOneAndUpdate(
        cond,
        {
          $set: edited,
        },
        {
          ...options,
          new: true,
        },
        (err, res) => {
          if (err) {
            if (cb) resolve(cb(err));
            else reject(err);
          } else {
            if (cb) resolve(cb(null, res));
            else resolve(res);
          }
        }
      );
    } catch (error) {
      if (cb) resolve(cb(error));
      else reject(error);
    }
  });
};

/**
 * Full update
 * @param {Object} cond Filter
 * @param {Object} update Fields to update
 * @param {Object} options
 * @param {(err, res) => {}} cb Callback
 */
module.exports.updateOnly = function (
  cond = {},
  update,
  options = {},
  cb = null
) {
  return new Promise((resolve, reject) => {
    try {
      this.findOneAndUpdate(
        cond,
        update,
        {
          ...options,
          new: true,
        },
        (err, res) => {
          if (err) {
            if (cb) resolve(cb(err));
            else reject(err);
          } else {
            if (cb) resolve(cb(null, res));
            else resolve(res);
          }
        }
      );
    } catch (error) {
      if (cb) resolve(cb(error));
      else reject(error);
    }
  });
};

/**
 * Delete multiple by id
 * @param {Array} deleted Deleted list
 * @param {(err, res) => {}} cb Callback
 */
module.exports.deleteSelected = function (deleted, cb = null) {
  return new Promise((resolve, reject) => {
    try {
      this.updateMany(
        {
          _id: {
            $in: deleted,
          },
        },
        {
          $set: {
            active: false,
          },
        },
        { multi: true },
        (err, res) => {
          if (err) {
            if (cb) resolve(cb(err));
            else reject(err);
          } else {
            if (cb) resolve(cb(null, res));
            else resolve(res);
          }
        }
      );
    } catch (error) {
      if (cb) resolve(cb(error));
      else reject(error);
    }
  });
};

/**
 * push data into array
 * @param {Object} cond Filter
 * @param {Object} update Fields to update
 * @param {Object} options
 * @param {(err, res) => {}} cb Callback
 */
module.exports.pushManyIntoArray = function (
  cond = {},
  update,
  options = {},
  cb = null
) {
  return new Promise(async (resolve, reject) => {
    try {
      // let foundData = await this.findOne({
      //   ...cond,
      //   active: true,
      // });
      const f = Object.keys(update)[0];
      // if (f) foundData[f].push(...update[f]);
      // const updated = await foundData.save();
      
      const updated = await this.findOneAndUpdate({
        ...cond,
        active: true,
      }, {
        $addToSet: {
          [f]: {
            $each: update[f]
          }
        }
      }, {
        new: true
      })
      resolve(updated);
    } catch (error) {
      if (cb) resolve(cb(error));
      else reject(error);
    }
  });
};
