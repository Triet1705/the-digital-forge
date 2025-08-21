const { prisma, Prisma } = require("../lib/prisma");
const cloudinary = require("../config/cloudinary");

const uploadImageToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "project-tdforge/options",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
};

const create = async (optionData, imageBuffer) => {
  const imageUrl = await uploadImageToCloudinary(imageBuffer);

  const newOption = await prisma.option.create({
    data: {
      name: optionData.name,
      sku: optionData.sku,
      price: parseFloat(optionData.price),
      categoryId: optionData.categoryId,
      swatchImageUrl: imageUrl,
    },
  });

  return newOption;
};

const getAll = async (categoryId) => {
  const whereClause = categoryId ? { categoryId: categoryId } : {};
  return await prisma.option.findMany({ where: whereClause });
};

const getById = async (id) => {
  const option = await prisma.option.findUnique({ where: { id } });
  if (!option) {
    throw new Error("RecordNotFound");
  }
  return option;
};

const update = async (id, optionData, imageBuffer) => {
  try {
    let newImageUrl;
    if (imageBuffer) {
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
      newImageUrl = await uploadImageToCloudinary(imageBuffer);
    }

    const updatedOption = await prisma.option.update({
      where: { id },
      data: {
        name: optionData.name,
        price: optionData.price ? parseFloat(optionData.price) : undefined,
        sku: optionData.sku,
        ...(newImageUrl && { swatchImageUrl: newImageUrl }),
      },
    });
    return updatedOption;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("RecordNotFound");
    }
    throw error;
  }
};

const remove = async (id) => {
  try {
    const option = await prisma.option.findUnique({ where: { id } });
    if (option && option.swatchImageUrl) {
      const publicId = option.swatchImageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`project-tdforge/options/${publicId}`);
    }
    await prisma.option.delete({ where: { id } });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new Error("RecordNotFound");
    }
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
