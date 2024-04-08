import mongoose from "mongoose";
import bcrypt from "bcrypt"

const instituteSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "Institue Name already exists"],
        require: [true, "Institute Name not provided"],
        trim: true, // Remove leading/trailing whitespace
    },
    type: {
        type: String,
        enum: ['University', 'College', 'High School', 'Other'], // Specify allowed institute types
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // Specify supported location type
            required: true,
        },
        coordinates: {
            type: [Number], // Array of longitude and latitude
            required: true,
            index: '2dsphere', // Create geospatial index for efficient location searches
        },
        address: String,
    },
    website: {
        type: String,
        trim: true,
    },
    establishedYear: {
        type: Number,
        min: 1000, // Optional: Set a minimum year for validity
    },
    password:{
        type:String,
        require:[true, "institiute's password in missing"]
    },
    passwordChangedAt:Date,
    // Add more fields as needed (e.g., contact information, areas of focus, student body size)
});


//------------------- PRE MIDDLEWARE ----------------------------
instituteSchema.pre("save",async (next)=>{
    if(this.isModified("password") || this.isNew){
        this.password = await bcrypt.hash(this.password, 10)
        this.passwordChangedAt = new Date()
    }
    return next();
})



// ----------------- INSTITUTE METHODS ------------------------

instituteSchema.methods.checkPassword = async function (password , encrypPass){
    return await bcrypt.compare( password, encrypPass);
}

instituteSchema.methods.isPasswordChangedAfter = function (TimeStamp){
    //Return true if changed else false
    if(this.passwordChangedAt){
        const timeOfChange = parseInt(this.passwordChangedAt.getTime()/1000,10);
        return TimeStamp < timeOfChange;
    }
    return false;
}

const Institue = new mongoose.model("Institute", instituteSchema)

export default Institue