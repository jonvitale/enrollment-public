export default {
  qInfo: { qType: 'visualization' },
  qHyperCubeDef: {
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
          qFieldDefs: ['Publication Name'],
          qFieldLabels: ['publicationName'],
          qSortCriterias: [{ qSortByLoadOrder: 0, qSortByAscii: 1 }]
        },
        qNullSuppression: false
      },
      {
        qDef: {
          qFieldDefs: ['School URL Slug'],
          qFieldLabels: ['slug']
        },
        qNullSuppression: false
      },
      {
        qDef: {
          qFieldDefs: ['SRC School ID'],
          qFieldLabels: ['srcschoolid']
        },
        qNullSuppression: true
      },
      {
        qDef: {
          qFieldDefs: ['Sector'],
          qFieldLabels: ['sector']
        },
        qNullSuppression: false
      },
      {
        qDef: {
          qFieldDefs: ['ZIP Code'],
          qFieldLabels: ['zipCode']
        },
        qNullSuppression: false
      },
      {
        qDef: {
          qFieldDefs: ['Admission Type'],
          qFieldLabels: ['admissionType']
        },
        qNullSuppression: true
      },
      {
        qDef: {
          qFieldDefs: ['Current Network'],
          qFieldLabels: ['network']
        },
        qNullSuppression: true
      }
    ],
    qMeasures: [
      {
        qDef: {
          qDef:
            "Count(distinct {<[School Year] = {'$(vSchoolYear_Current)'}>} 1)",
          qLabel: 'Flag_CY'
        }
      }
    ],
    qInitialDataFetch: [{ qWidth: 20, qHeight: 500 }]
  }
}
