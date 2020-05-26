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
          qFieldDefs: ['Street Address'],
          qFieldLabels: ['address']
        },
        qNullSuppression: false
      },
      {
        qDef: {
          qFieldDefs: ['Zip Code'],
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
      },

      {
        qDef: {
          qDef:
            "Replace(Only(distinct{<[School Year] = {'$(vSchoolYear_Current)'}>} [School Name Abbreviate]), ' ', '_')",
          qLabel: 'slug'
        }
      }
    ],
    qInitialDataFetch: [{ qWidth: 20, qHeight: 500 }]
  }
}
