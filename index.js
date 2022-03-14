const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json());
const connect = () => {
    return mongoose.connect("mongodb+srv://rohitraj:rohit987@cluster0.lvzf4.mongodb.net/banks?retryWrites=true&w=majority")
};

//SCHEMAS

//1. userschema

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        age: { type: Number, required: true },
        email: { type: Number, required: true, unique: true },
        address: { type: String, required: true },
        gender: { type: String, required: true, default: "female" },
        created_at: { type: Date, required: true, default: Date.now },

        // masteraccountId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "masteraccount",
        //     required: true,
        // },

        // saving_accountId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "masteraccount",
        //     required: true,
        // },
    },

    {
        versionKey: false,
        timestamps: true,
    }
)
//1.User model
const User = mongoose.model("user", userSchema)

//2.  BranchDetail

const BranchDetailSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        IFSC: { type: String, required: true },
        MICR: { type: Number, required: true },
        created_at: { type: Date, required: true, default: Date.now },

        masteraccountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "masteraccount",
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)
//2.branchdetail model

const BranchDetail = mongoose.model("branchdetail", BranchDetailSchema)



//3.  MasterAccount

const MasterAccountSchema = new mongoose.Schema(
    {
        balance: { type: Number, required: true },

    },
    {
        versionKey: false,
        timestamps: true,
    }
)

//3. MasterAccount Model

const MasterAccount = mongoose.model("masteraccount", MasterAccountSchema)


//4.  SavingsAccount

const SavingsAccountSchema = new mongoose.Schema(
    {
        balance: { type: Number, required: true },
        account: { type: Number, required: true, unique: true },
        interestRate: { type: Number, required: true, unique: true },
        created_at: { type: Date, required: true, default: Date.now },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)
//4.SavingsAccount model
const SavingAccount = mongoose.model("saving_account", SavingsAccountSchema)

//5.FixedAccountSchema
const FixedAccountSchema = new mongoose.Schema(
    {
        balance: { type: Number, required: true },
        account: { type: Number, required: true, unique: true },
        interestRate: { type: Number, required: true, unique: true },
        maturity: { type: Date, required: true },

        masteraccountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "masteraccount",
            required: true,
        },

    },
    {
        versionKey: false,
        timestamps: true,
    }
)
//5.FixedAccount Model
const FixedAccount = mongoose.model("fixed_account", FixedAccountSchema)


//CRUD

//get
app.get("/masteraccounts", async (req, res) => {
    try {
        const MasterAccounts = await MasterAccount.find().lean().exec();
        return res.status(200)({ masterAccounts: MasterAccounts })
    }
    catch (error) {
        return res.status(500).send({ message: "something went wrong" })
    }
});

app.get("/users", async (req, res) => {
    try {
        const Users = await User.find().lean().exec();
        return res.status(200)({ Users: Users })
    }
    catch (error) {
        return res.status(500).send({ message: "something went wrong" })
    }
});

app.post("/users", async (req, res) => {
    try {
        const user = await User.create(req.body)
        return res.status(201).send(user)
    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
})




app.listen(3000, async () => {
    try {
        await connect()
    }
    catch (err) {
        console.log(err)
    }
    console.log("listening on port 3000")
})