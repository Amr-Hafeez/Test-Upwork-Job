const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Your first name is missing!"]
    },
    lastName: {
        type: String,
        required: [true, "Your last name is missing!"]
    },
    email: {
        type: String,
        required: [true, "Email field is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password field is required"]
    }
});

/*
    Uses bcrypt to hash the password field in two cases:
        - The user is created for the first time.
        - The password field is modified.
*/
userSchema.pre('save', async function(){
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);