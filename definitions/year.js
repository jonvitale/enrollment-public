export default {
  qInfo: { qType: 'visualization' },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ['School Year'],
          qFieldLabels: ['SchoolYear']
        },
        qNullSuppression: true
      }
    ],
    qInitialDataFetch: [{ qWidth: 1, qHeight: 100 }]
  }
}
