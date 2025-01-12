// var defaultTarget = `http://development.prepera.io:5757`;
var defaultTarget = `http://127.0.0.1:4141`;

module.exports = [
  {
    context: [`/v1/**`, `/api/**`],
    target: defaultTarget,
    secure: true,
  },
  {
    context: [`/uploads/**`],
    target: defaultTarget,
    secure: true,
  },
  {
    context: [`/assets/**`],
    target: defaultTarget,
    secure: true,
  },
];
