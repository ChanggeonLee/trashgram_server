var exec = require('child_process').exec;

var image_path = "./../tfmodel/example.jpg";

var cmd = 'python \
../tfmodel/label_image.py \
--graph=../tfmodel/output_graph.pb \
--labels=../tfmodel/output_labels.txt \
--input_layer=Placeholder \
--output_layer=final_result \
--image=./' + image_path;

var result;

exec(cmd, async function(error, stdout, stderr) {
    await console.log(stdout)
    result = stdout
    console.log(result.split(' ')[0])
});
