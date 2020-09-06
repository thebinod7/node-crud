const obj = {
  pi: 3.14,
  area: function (r) {
    console.log("THIS===>", this);
    return this.pi * r * r;
  },
};

const r = 4;
let _area = obj.area(r);
let _call_area = obj.area.call({ pi: 3.145 }, r);
let _appy_area = obj.area.apply({ pi: 3.142 }, [r]);
let customFunc = obj.area.bind({ pi: 3 });

// Call after some event customFunc();

console.log("AREA====>", _area);
// ===================================

console.log("CALL====>", _call_area);
// ===================================

console.log("APPLY====>", _appy_area);
// ===================================
