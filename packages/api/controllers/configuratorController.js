const prisma = require("../lib/prisma");

const calculateConfigurator = async (req, res) => {
  try {
    const { versionId } = req.params;
    const { selectedOptionIds } = req.body;

    if (!Array.isArray(selectedOptionIds)) {
      return res
        .status(400)
        .json({ error: "selectedOptionIds must be an array." });
    }

    const version = await prisma.version.findUnique({
      where: {
        id: versionId,
      },
    });
    if (!version) {
      return res
        .status(404)
        .json({ error: `Version with ID '${versionId}' not found.` });
    }

    const basePrice = version.basePrice;

    const selectedOptions = await prisma.option.findMany({
      where: {
        id: { in: selectedOptionIds },
      },
    });

    const optionsPrice = selectedOptions.reduce((sum, options) => {
      return sum.plus(options.price);
    }, new Prisma.Decimal(0));

    const totalPrice = basePrice.plus(optionsPrice);

    res.status(200).json({
      basePrice: basePrice.toFixed(2),
      optionsPrice: optionsPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      updatedSpecs: {},
    });
  } catch (error) {
    console.error("Error calculating configurator: ", error);
    res.status(500).json({ error: "Calculated failed." });
  }
};

module.exports = {
  calculateConfigurator,
};
