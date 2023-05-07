import mongoose from 'mongoose';
  
  
interface IProduct extends mongoose.Document {
  name: string;
  price: number;
  description: string;
}
  
  const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true }
  },
      {collection:"products"}
  );
  

  productSchema.post('save', (doc) => {
    console.log(`A new product with the name ${doc.name} has been saved to the database!`);
  });

  export const Product = mongoose.model('Product', productSchema);