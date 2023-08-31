/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addConstraint('product', 'fk_product.created_by_users.id', 'FOREIGN KEY(created_by) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('product', 'fk_product.created_by_users.id');
};
