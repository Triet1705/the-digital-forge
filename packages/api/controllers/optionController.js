const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cloudinary = require("../config/cloudinary");

const createOption = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;

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

module.exports = {
  createOption,
};
