"use strict";

import gulp from "gulp";
const smartgrid = require("smart-grid");

gulp.task("smart-grid", (cb) => {
    smartgrid("./src/styles/vendor/import/", {
        outputStyle: "scss",
        filename: "_smart-grid",
        columns: 12, // number of grid columns
        offset: "30px", // gutter width - 30px
        mobileFirst: true,
        mixinNames: {
            container: "container",
        },
        container: {
            fields: "15px", // side fields - 15px
            maxWidth: "1280px",
        },
        breakPoints: {
            xs: {
                width: "420px"
            },
            sm: {
                width: "576px"
            },
            md: {
                width: "767px"
            },
            lg: {
                width: "992px"
            },
            xl: {
                width: "1280px"
            }
        }
    });
    cb();
});
