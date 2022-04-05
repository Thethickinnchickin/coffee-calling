
<template>

    <div>
        <head>
            <meta charset="UTF-8">
            <meta name="description" content="Author: M. Reiley,
            This is a mock fully functional e-commerce site that sells various coffee products and items">
            <meta name="keywords" content="HTML, CSS, JavaScript">
            <meta name="author" content="John Doe">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preload" as="font">
        </head>
        <NavBar/>
        <nuxt />
        <Footer />
    </div>
</template>



<script>
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
export default {
    components: {
        NavBar,
        Footer
    }
}
</script>

<style>
body {
    font-size: 13px;
    line-height: 19px;
    color: #111
}
</style>

