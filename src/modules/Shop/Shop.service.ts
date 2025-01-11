
import ShopModel from "./Shop.model";


export const findByEmail = async ({ email, select = {
    email: 1,
    password: 1,
    name: 1,
    roles: 1,
} }) => {

    return await ShopModel.findOne({ email }).select(select).lean()
}
