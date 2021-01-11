export default {
  qInfo: { qType: 'visualization' },
  qHyperCubeDef: {
    qMeasures: [
      {
        qDef: {
          qLabel: 'hasCatchment',
          qDef: `
            -1 * (Sum({<[School Year] = {'$(vSchoolYear_Current)'}>} [InCatchmentFlag])
            > 0)`
        }
      }
    ],
    qInitialDataFetch: [{ qWidth: 50, qHeight: 1 }]
  }
}
