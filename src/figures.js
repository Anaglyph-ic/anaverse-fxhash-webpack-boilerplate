const genererFigures = (fxhash) => {
  let alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
  let b58dec = (str) =>
    [...str].reduce(
      (p, c) => (p * alphabet.length + alphabet.indexOf(c)) | 0,
      0
    );
  let fxhashTrunc = fxhash.slice(2);
  let regex = new RegExp(".{" + ((fxhash.length / 4) | 0) + "}", "g");
  let hashes = fxhashTrunc.match(regex).map((h) => b58dec(h));
  let sfc32 = (a, b, c, d) => {
    return () => {
      a |= 0;
      b |= 0;
      c |= 0;
      d |= 0;
      var t = (((a + b) | 0) + d) | 0;
      d = (d + 1) | 0;
      a = b ^ (b >>> 9);
      b = (c + (c << 3)) | 0;
      c = (c << 21) | (c >>> 11);
      c = (c + t) | 0;
      return (t >>> 0) / 4294967296;
    };
  };
  var fxrand = sfc32(...hashes);

  const figures = [];
  const features = { Name: "" };
  
  // you can't import anything from outside (no functions or libraries)
  // you should not produce any collateral effect
  // You have access to fxrand()

  // if you are unsure of the scale, make all geometry sizes and positions related
  // to a constant;



  // ------ your code starts here ------

  // Here the variable u is the unit used to scale
  const u = 1;

  //simple cube

  var cube = {
    geometry: {
      type: "BoxGeometry", // Type of geometry
      args: [
        // Arguments relevant to the geometry (check THREE API)
        (0.1 + fxrand() * 0.5) * u, // Cube width
        (0.1 + fxrand() * 0.5) * u, // Cube height
        (0.1 + fxrand() * 0.5) * u // Cube depth
      ]
    },
    pos: {
      // Position
      x: (-0.5 + fxrand() * 1) * u,
      y: (-0.5 + fxrand() * 1) * u,
      z: (-0.5 + fxrand() * 1) * u
    },
    rot: {
      // Rotation
      x: 0,
      y: 0,
      z: 0
    },
    lines: true, // Display color segments (like wireframe, but faces not triangles)
    hatch: true, // Fill with white texture
    full: false // Fill with color texture (in the anaverse, red and cyan)
  };

  figures.push(cube);

  return { figures, features };
};

export { genererFigures };
