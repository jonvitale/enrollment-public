export default {
  qInfo: { qType: 'visualization' },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ['School URL Slug'],
          qFieldLabels: ['slug']
        },
        qNullSuppression: false
      },
      {
        qDef: {
          qFieldDefs: ['School Name Abbreviated'],
          qFieldLabels: ['abbreviated'],
          qSortCriterias: [{ qSortByLoadOrder: 0, qSortByAscii: 1 }]
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
          qFieldDefs: ['School Level'],
          qFieldLabels: ['schoolLevel']
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
          qLabel: 'countCatchment',
          qDef: `Num(
            Sum({<[School Year] = {'$(vSchoolYear_Current)'}>} [InCatchmentFlag])
            +
            Alt(Sum({<[School Year] = {'$(vSchoolYear_Current)'}>} [OutCatchmentFlag]), 0)
          , '#,##0')`
        }
      },
      {
        qDef: {
          qLabel: 'countCatchmentIn',
          qDef: `Num(
            Sum({<[School Year] = {'$(vSchoolYear_Current)'}>} [InCatchmentFlag])
          , '#,##0')`
        }
      },
      {
        qDef: {
          qLabel: 'countCatchmentOut',
          qDef: `Num(
            Sum({<[School Year] = {'$(vSchoolYear_Current)'}>} [OutCatchmentFlag])
          , '#,##0')`
        }
      },
      {
        qDef: {
          qLabel: 'countCatchmentOutCharter',
          qDef: `Num(
            Sum({<[Neighborhood Sector]={'Charter'}, [School Year] = {'$(vSchoolYear_Current)'}>} [OutCatchmentFlag])
          , '#,##0')`
        }
      },
      {
        qDef: {
          qLabel: 'countCatchmentOutCityWide',
          qDef: `Num(
            Sum({<[Neighborhood Sector]-={'Charter'}, [Neighborhood Admission Type]={'Special Admit', 'Citywide'}, [School Year] = {'$(vSchoolYear_Current)'}>} [OutCatchmentFlag])
          , '#,##0')`
        }
      },
      {
        qDef: {
          qLabel: 'countCatchmentOutOtherNeighborhood',
          qDef: `Num(
            Sum({<[Neighborhood Sector]-={'Charter'}, [Neighborhood Admission Type]={'Neighborhood'}, [School Year] = {'$(vSchoolYear_Current)'}>} [OutCatchmentFlag])
          , '#,##0')`
        }
      },
      {
        qDef: {
          qLabel: 'countEnrollment',
          qDef: `Num(
            Sum({<[School Year] = {'$(vSchoolYear_Current)'}, Flag_Inclusion_App_Enrollment={1}>} [InCatchmentFlag])
            +
            Sum({<[School Year] = {'$(vSchoolYear_Current)'}, Flag_Inclusion_App_Enrollment={1}>} [FromOtherCatchmentFlag])
          , '#,##0')`
        }
      },
      {
        qDef: {
          qLabel: 'countEnrollmentEL',
          qDef: `Num(
            Sum({<[English Language Learner] = {'Y'}, [School Year] = {'$(vSchoolYear_Current)'}, Flag_Inclusion_App_Enrollment={1}>} [InCatchmentFlag])
            +
            Sum({<[English Language Learner] = {'Y'}, [School Year] = {'$(vSchoolYear_Current)'}, Flag_Inclusion_App_Enrollment={1}>} [FromOtherCatchmentFlag])
          , '#,##0')`
        }
      },
      {
        qDef: {
          qLabel: 'countEnrollmentSPED',
          qDef: `Num(
            Sum({<[Primary Disability] -= {''}, Flag_Inclusion_App_Enrollment = {1}, [School Year] = {'$(vSchoolYear_Current)'}, Flag_Inclusion_App_Enrollment={1}>} [InCatchmentFlag])
            +
            Sum({<[Primary Disability] -= {''}, Flag_Inclusion_App_Enrollment = {1}, [School Year] = {'$(vSchoolYear_Current)'}, Flag_Inclusion_App_Enrollment={1}>} [FromOtherCatchmentFlag])
          , '#,##0')`
        }
      },
      {
        qDef: {
          qLabel: 'countEnrollmentEconDis',
          qDef: `Num(
            Sum({<[Free From Tape] = {'FT'}, [School Year] = {'$(vSchoolYear_Current)'}, Flag_Inclusion_App_Enrollment={1}>} [InCatchmentFlag])
            +
            Sum({<[Free From Tape] = {'FT'}, [School Year] = {'$(vSchoolYear_Current)'}, Flag_Inclusion_App_Enrollment={1}>} [FromOtherCatchmentFlag])
          , '#,##0')`
        }
      }
    ],
    qInitialDataFetch: [{ qWidth: 50, qHeight: 1 }]
  }
}
