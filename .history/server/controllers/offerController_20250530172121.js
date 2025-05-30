import {Offer} from "../models/offer.js";

async function getAllOffers(req,res,next) {
    res.status(200).json({message:'Заработало!!'})
}

export {getAllOffers};