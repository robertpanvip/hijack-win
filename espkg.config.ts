import {defineConfig} from "es-pkg";

export default defineConfig({
    "es": "./es",
    "lib": "./lib",
    "typings": "./es",
    "entry":"./src",
    "publishDir":"../hack-windows-npm"
})