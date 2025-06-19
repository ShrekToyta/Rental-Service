import { adaptOfferToClient } from "../adapters/offerAdapter.js";
import {Offer} from "../models/offer.js";

async function getAllOffers(req,res,next) {
    try{
        const offers = await Offer.findAll();
        const adaptedOffers = offers.map(adaptOfferToClient);
        res.status(200).json(adaptedOffers);
    }catch(error){
        console.error("Не удалось получить список предложений",error);
    }
}

export {getAllOffers};

export async function createOffer(req, res, next) {
 try {
   const {
     title, description, publishDate, city,
     isPremium, isFavorite, rating, type, rooms, guests, price,
     features, commentsCount, latitude, longitude, userId
   } = req.body;


   if (!req.files?.previewImage || req.files.previewImage.length === 0) {
     return next(ApiError.badRequest('Превью изображение обязательно для загрузки'));
   }


   const previewImagePath = `/static/${req.files.previewImage[0].filename}`;


   let processedPhotos = [];
   if (req.files?.photos) {
     processedPhotos = req.files.photos.map(file => `/static/${file.filename}`);
   }


   let parsedFeatures = [];
   if (features) {
     try {
       parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
     } catch {
       parsedFeatures = features.split(',');
     }
   }


   const offer = await Offer.create({
     title,
     description,
     publishDate,
     city,
     previewImage: previewImagePath,
     photos: processedPhotos,
     isPremium,
     isFavorite,
     rating,
     type,
     rooms,
     guests,
     price,
     features: parsedFeatures,
     commentsCount,
     latitude,
     longitude,
     authorId: userId
   });


   return res.status(201).json(offer);
 } catch (error) {
   next(ApiError.internal('Не удалось добавить предложение: ' + error.message));
 }
}

const getFullOffer = async (req, res, next) => {
  try {
 
    const { id } = req.params;
    const offer = await Offer.findByPk(id, {
      include: [
        {
          model: User, 
          as: 'author', 
          attributes: ['id', 'name', 'email', 'avatar'] 
        },
        {
          model: Comment, 
          include: {
            model: User,
            attributes: ['name']
          }
        },
        {
          model: Feature, 
          attributes: ['name']
        }
      ]
    });

    if (!offer) {
      return res.status(404).json({
        error: 'Offer not found',
        message: `Offer with ID ${id} does not exist`
      });
    }
   
    res.status(200).json({
      status: 'success',
      data: {
        offer: {
          ...offer.toJSON(),
          features: offer.Features?.map(f => f.name) // Форматирование удобств
        }
      }
    });

  } catch (error) {
    next({
      status: 500,
      message: `Database error: ${error.message}`
    });
  }
};
