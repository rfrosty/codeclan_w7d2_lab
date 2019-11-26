import Vue from "vue";

document.addEventListener("DOMContentLoaded", () => {
    new Vue({
        el: "#app",
        data: {
            countries: [],
            selected: {},
        },
        computed: {
            totalPopulation: function() {
                return this.countries.reduce((total, country) => total + country.population, 0);
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
            }
        }
    });
});