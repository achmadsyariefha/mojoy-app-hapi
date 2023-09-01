/* eslint-disable camelcase */

const mapDBToModelProduct = ({
  id,
  name,
  category,
  price,
  created_at,
  updated_at,
  created_by,
}) => ({
  id,
  name,
  category,
  price,
  createdAt: created_at,
  updatedAt: updated_at,
  createdBy: created_by,
});

module.exports = { mapDBToModelProduct };
