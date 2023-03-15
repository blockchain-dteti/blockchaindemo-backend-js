const { Company } = require("../model/companyModel");

exports.getCompanies = async (req, res) => {
  const { id } = req.query;
  try {
    const companies = await Company.findAll({
      where: {
        id,
      },
    });
    res.status(200).json(companies);
  } catch (error) {
    console.error(error);
  }
};
