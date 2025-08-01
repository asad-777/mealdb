function data_collector(id, name, location, ingredient, recipe, thumbnail, tutorial, tags) {
    this.id = id
    this.name = name
    this.location = location
    this.ingredient = ingredient
    this.recipe = recipe
    this.thumbnail = thumbnail
    this.tutorial = tutorial
    this.tags = tags
}
function Ingredient(ingre, qunat) {
    this.ingre = ingre
    this.qunat = qunat
}
function getdataoutside(data) {
    if (data.meals) {
        let count = 0, ingg = []
        for (x in data.meals[0]) {
            if (x.startsWith(`strIngredient`) && data.meals[0][x]) {
                count++;
            }
        }
        for (let i = 1; i <= count; i++) {
            ing = `strIngredient${i}`
            msr = `strMeasure${i}`
            ing = data.meals[0][ing]
            msr = data.meals[0][msr]
            const temp0 = new Ingredient(ing, msr)
            ingg.push(temp0)
        }
        const final = new data_collector(
            data.meals[0].idMeal,
            data.meals[0].strMeal,
            data.meals[0].strArea,
            ingg,
            data.meals[0].strInstructions,
            data.meals[0].strMealThumb,
            data.meals[0].strYoutube,
            data.meals[0].strTags,
        )
        return final
    }
    else {
        return "No recipe found"
    }
}



async function getmeal(name) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res => res.json()).then(json => data = json).catch(err => data = err)
    const response = getdataoutside(data);
    if (response == "No recipe found") {
        document.getElementById(`placeholdermain`).classList.remove(`hidden`)
        document.getElementById(`placeholderskeleton`).classList.add(`hidden`)
        document.getElementById(`placeholdermain`).innerHTML = `No recipe found, try searching something else   `
    }
    else {
        document.querySelectorAll('.skeleton').forEach(el => {
            el.classList.remove('skeleton');
        });
        document.querySelectorAll('.opacity-0').forEach(el => {
            el.classList.remove('skeleton');
        });
        document.getElementById(`imgthmb`).src = response.thumbnail
        document.getElementById(`title`).innerHTML = response.name
        if (response.tags == null) {
            document.getElementById(`location`).innerHTML = `${response.location}`
        }
        else {
            document.getElementById(`location`).innerHTML = `${response.location} - ${response.tags}`
        }
        document.getElementById(`link`).innerHTML = `Video Tutorial`
        document.getElementById(`link`).href = response.tutorial
        document.getElementById(`hingred`).innerHTML = `Ingredients`
        document.getElementById(`inggaas`).innerHTML = ``
        let ingglist = ``
        for (x of response.ingredient) {
            ingglist += `<li><span class="font-semibold">${x.ingre.trim()}</span> (${x.qunat.trim()})</li>`
        }
        document.getElementById(`inggaas`).innerHTML = ingglist
        document.getElementById(`hinst`).innerHTML = `Recipe Instructions`
        document.getElementById(`paraasn`).innerHTML = response.recipe
    }
}


function damn() {
    const ask = document.getElementById(`inputmain`).value

    if (ask) {
        document.getElementById(`placeholdermain`).classList.add(`hidden`)
        document.getElementById(`placeholderskeleton`).classList.remove(`hidden`)
        getmeal(ask)
    }
}