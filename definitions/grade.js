export default {
  qInfo: { qType: 'visualization' },
  qHyperCubeDef: {
    qInitialDataFetch: [
      {
        qWidth: 2,
        qHeight: 20
      }
    ],
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ['Grade Level'],
          qFieldLabels: ['grade'],
          qSortCriterias: [{ qSortByLoadOrder: 0, qSortByAscii: 1 }]
        },
        qNullSuppression: true
      }
    ],
    qMeasures: [
      {
        qDef: {
          qLabel: 'countEnrollment',
          qDef: `Num(
            Sum({<[School Year] = {'$(vSchoolYear_Current)'}, Flag_Inclusion_App_Enrollment={1}>} [InCatchmentFlag])
            +
            Sum({<[School Year] = {'$(vSchoolYear_Current)'}, Flag_Inclusion_App_Enrollment={1}>} [FromOtherCatchmentFlag])
          , '#,##0')`
        }
      }
    ]
  }
}
