import { AsyncPipe, NgClass } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

export const CommonImports= {
    FORM_IMPORTS: [
        ReactiveFormsModule,
        NgClass,
        AsyncPipe,
        RouterLink
    ]
}