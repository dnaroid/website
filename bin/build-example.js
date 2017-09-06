const {rollup} = require("rollup")

let globals = {}, external = []
;("model transform state view keymap inputrules history commands schema-basic " +
  "schema-list dropcursor menu example-setup gapcursor").split(" ").forEach(name => {
  globals["prosemirror-" + name] = "PM." + name.replace(/-/g, "_")
  external.push("prosemirror-" + name)
})

let options = {
  entry: process.argv[2],
  plugins: [
    require("rollup-plugin-node-resolve")({main: true}),
    require("rollup-plugin-commonjs")(),
    require("rollup-plugin-buble")()
  ],
  external,
  globals,
  format: "iife"
}

rollup(options).then(bundle => bundle.generate(options)).then(
  output => console.log(output.code),
  error => { console.log(error.stack || error.message); process.exit(1) }
)
