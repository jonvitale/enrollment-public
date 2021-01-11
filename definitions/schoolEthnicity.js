export default {
  qInfo: { qType: 'visualization' },
  qHyperCubeDef: {
    qInitialDataFetch: [
      {
        qWidth: 20,
        qHeight: 400
      }
    ],
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ['School Name'],
          qFieldLabels: ['school'],
          qSortCriterias: [{ qSortByLoadOrder: 0, qSortByAscii: 1 }]
        },
        qNullSuppression: true
      },
      {
        qDef: {
          qFieldDefs: ['Race/Ethnicity'],
          qFieldLabels: ['ethnicity'],
          qSortCriterias: [{ qSortByLoadOrder: 0, qSortByAscii: 1 }]
        },
        qNullSuppression: false
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
