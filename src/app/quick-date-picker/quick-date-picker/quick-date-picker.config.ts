export class QuickDatePicker {
    presets: Date[] = [
        { id: 'today', lable: 'Today' },
        { id: 'yesterday', lable: 'Yesterday' },
        { id: 'this_week', lable: 'This Week' },
        { id: 'last_week', lable: 'Last Week' },
        { id: 'last_7days', lable: 'Last 7 days' },
        { id: 'this_month', lable: 'This Month' },
        { id: 'last_month', lable: 'Last Month' },
        { id: 'this_year', lable: 'This Year' },
        { id: 'custom_range', lable: 'Custom Range' }
    ];
}

export interface Date {
    id: string;
    lable: string;
}
