(() => ({
  name: 'RedirectComponent',
  icon: 'ContainerIcon',
  category: 'HOI',
  structure: [
    {
      name: 'RedirectComponent',
      options: [
        {
          type: 'CUSTOM',
          label: 'Link to',
          key: 'linkType',
          value: 'internal',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              {
                name: 'Internal page',
                value: 'internal',
              },
              {
                name: 'External page',
                value: 'external',
              },
            ],
          },
        },
        {
          type: 'VARIABLE',
          label: 'External Page URL',
          key: 'linkToExternal',
          value: [''],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'linkType',
              comparator: 'EQ',
              value: 'external',
            },
          },
        },
        {
          type: 'ENDPOINT',
          label: 'Internal Page',
          key: 'linkToInternal',
          value: '',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'linkType',
              comparator: 'EQ',
              value: 'internal',
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
