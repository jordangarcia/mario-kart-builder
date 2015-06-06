var toImmutable = require('nuclear-js').toImmutable

/**
 * Getters for app
 */
exports.currentView = ['ui', 'currentView']

exports.currentKart = [
  ['currentKart'],
  (currentKart) => {
    var totals = [
      currentKart.get('kart'),
      currentKart.get('wheels'),
      currentKart.get('glider'),
    ]
    .filter(f => !!f)
    .reduce((totals, val) => {
      val.forEach((val, key) => {
        if (key === 'Name') {
          totals[key] = 'Totals'
          return
        }
        if (totals[key] === undefined) {
          totals[key] = 0;
        }
        totals[key] += val
      });
      return totals
    }, {});


    return currentKart.merge(toImmutable({
      totals: totals
    }));
  }
];
