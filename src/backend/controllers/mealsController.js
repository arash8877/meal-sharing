const knex = require("../database");


//-----------------------------------------------
const getAllMeals = async (req, res) => {
  console.log(req);
  try {
    const allMeals = await knex("meal").select("title", "price");
    console.log(allMeals);
    res.status(200).json(allMeals);
  } catch (error) {
    res.status(500).json(error);
  }
};

//-----------------------------------------------
const addMeal = async (req, res) => {
  try {
   await knex('meal').insert({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        when: req.body.when,
        max_reservations: req.body.max_reservations,
        price: req.body.price,
        created_date: req.body.created_date
      });
    res.send('the new meal added successfully.')

  } catch (error) {
    res.status(500).json(error);
  }
};


//-------------------------------------------------
const getMealById = async (req, res) => {
    const idNumber = req.params.id; 
    try {
        const result = await knex(`meal`)
        .where({id : idNumber});
        
        result.length === 0
        ? res.status(404).json("Oops! the meal does not exist")
        : res.status(200).json(result)

    } catch (error) {
        res.status(500).json(error)
    }
}

//--------------------------------------------
const updateMealById = async (req, res) => {
    const idNumber = req.params.id
    try {
        const result = await knex(`meal`)
        .where({id: idNumber})
        .update({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            when: req.body.when,
            max_reservations: req.body.max_reservations,
            price: req.body.price,
            created_date: req.body.created_date
        })

        result.length === 0
        ? res.status(404).json("Oops! the meal does not exist")
        : res.status(200).json('The meal updated successfully.')
        
    } catch (error) {
        res.status(500).json(error)
    }
}

//--------------------------------------------
const deleteMealById = async (req, res) => {
    const idNumber = req.params.id
    try {
        const result = await knex(`meal`)
        .where({id: idNumber})
        .del()

        result === 0
        ? res.status(404).json("Oops! the meal does not exist")
        : res.status(200).json('The meal deleted successfully.')
        
    } catch (error) {
        res.status(500).json(error)
    }
}

//---------------------------------------------
module.exports = {
  getAllMeals,
  addMeal,
  getMealById,
  updateMealById,
  deleteMealById
};
