const { Prisma } = require("@prisma/client");
const prisma = require("../lib/prisma");
const cloudinary = require("../config/cloudinary");

const createOption = async (req, res) => {
  try {
    const { name, price, categoryId, sku } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "project-tdforge/options",
      },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error: ", error);
          res.status(500).json({ error: "Failed to upload image." });
        }

        const imageUrl = result.secure_url;
        const newOption = await prisma.option.create({
          data: {
            sku,
            name,
            price: parseFloat(price),
            swatchImageUrl: imageUrl,
            categoryId,
          },
        });
        res.status(201).json(newOption);
      }
    );
    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error("Error creating option: ", error);
    res.status(500).json({ error: "Failed to create option." });
  }
};

const updateOption = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    let newImageUrl;

    if (req.file) {
      const oldOption = await prisma.option.findUnique({ where: { id } });
      if (oldOption && oldOption.swatchImageUrl) {
        const publicId = oldOption.swatchImageUrl
          .split("/")
          .pop()
          .split(".")[0];
        await cloudinary.uploader.destroy(
          `project-tdforge/options/${publicId}`
        );
      }

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "project-tdforge/options" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });
      newImageUrl = result.secure_url;
    }

    const updatedOption = await prisma.option.update({
      where: { id: id },
      data: {
        name,
        price: price ? parseFloat(price) : undefined,
        ...(newImageUrl && { swatchImageUrl: newImageUrl }),
      },
    });
    res.status(200).json(updatedOption);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res
        .status(404)
        .json({ error: `Option with ID '${req.params.id}' not found.` });
    }
    console.error("Error updating option: ", error);
    res.status(500).json({ error: "Failed to update option." });
  }
};

const getAllOptions = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const whereClause = categoryId ? { categoryId: categoryId } : {};

    const options = await prisma.option.findMany({
      where: whereClause,

      select: {
        id: true,
        sku: true,
        name: true,
        price: true,
        swatchImageUrl: true,
        categoryId: true,
      },
    });
    res.status(200).json(options);
  } catch (error) {
    console.error("Error fetching options: ", error);
    res.status(500).json({ error: "Failed to retrieve options." });
  }
};

const getOptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const option = await prisma.option.findUnique({
      where: { id: id },

      select: {
        id: true,
        sku: true,
        name: true,
        price: true,
        swatchImageUrl: true,
        categoryId: true,
      },
    });

    if (!option) {
      return res
        .status(404)
        .json({ error: `Option with ID '${id}' not found.` });
    }
    res.status(200).json(option);
  } catch (error) {
    console.error("Error fetching option: ", error);
    res.status(500).json({ error: "Failed to retrieve option." });
  }
};

const deleteOption = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.option.delete({
      where: { id: id },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting option: ", error);
    res.status(500).json({ error: "Failed to delete option." });
  }
};

module.exports = {
  createOption,
  updateOption,
  getAllOptions,
  getOptionById,
  deleteOption,
};
