import Vue from "vue";

document.addEventListener("DOMContentLoaded", () => {
    new Vue({
        el: "#app",
        data: {
            countries: [],
            selected: null,
            favouriteCountries: []
        },
        computed: {
            totalPopulation: function() {
                return this.countries.reduce((total, country) => total + country.population, 0);
            },
            selectedNeighbours: function() {
                if (this.selected != null) {
                    return this.countries.filter(country => this.selected.borders.includes(country.alpha3Code));
                }
                return null;
            }
        },
        mounted() {
            this.fetchCountries();
        },
        methods: {
            fetchCountries: function() {
                fetch('https://restcountries.eu/rest/v2/all')
                .then(response => response.json())
                .then(data => this.countries = data)
                .catch(console.log("Error while trying to fetch countries"));
            },

            onAddFavouriteClick: function() {
                if (!this.favouriteCountries.includes(this.selected)) {
                    this.favouriteCountries.push(this.selected);
                }
            }
        }
    });
});