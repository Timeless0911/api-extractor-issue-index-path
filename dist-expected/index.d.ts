/**
 Convert a string literal to a custom string delimiter casing.

 This can be useful when, for example, converting a camel-cased object property to an oddly cased one.

 @see KebabCase
 @see SnakeCase

 @example
 ```
 import type {DelimiterCase} from 'type-fest';

 // Simple

 const someVariable: DelimiterCase<'fooBar', '#'> = 'foo#bar';

 // Advanced

 type OddlyCasedProperties<T> = {
 	[K in keyof T as DelimiterCase<K, '#'>]: T[K]
 };

 interface SomeOptions {
 	dryRun: boolean;
 	includeFile: string;
 	foo: number;
 }

 const rawCliOptions: OddlyCasedProperties<SomeOptions> = {
 	'dry#run': true,
 	'include#file': 'bar.js',
 	foo: 123
 };
 ```

 @category Change case
 @category Template literal
 */
declare type DelimiterCase<Value, Delimiter extends string> = string extends Value ? Value : Value extends string
	? StringArrayToDelimiterCase<
	SplitIncludingDelimiters<Value, WordSeparators | UpperCaseCharacters>,
	true,
	WordSeparators,
	UpperCaseCharacters,
	Delimiter
	>
	: Value;

/**
 Convert a string literal to kebab-case.

 This can be useful when, for example, converting a camel-cased object property to a kebab-cased CSS class name or a command-line flag.

 @example
 ```
 import type {KebabCase} from 'type-fest';

 // Simple

 const someVariable: KebabCase<'fooBar'> = 'foo-bar';

 // Advanced

 type KebabCasedProperties<T> = {
 	[K in keyof T as KebabCase<K>]: T[K]
 };

 interface CliOptions {
 	dryRun: boolean;
 	includeFile: string;
 	foo: number;
 }

 const rawCliOptions: KebabCasedProperties<CliOptions> = {
 	'dry-run': true,
 	'include-file': 'bar.js',
 	foo: 123
 };
 ```

 @category Change case
 @category Template literal
 */
declare type KebabCase<Value> = DelimiterCase<Value, '-'>;

export declare function kebabCase<T extends string>(str: T): KebabCase<T>;

/**
 Unlike a simpler split, this one includes the delimiter splitted on in the resulting array literal. This is to enable splitting on, for example, upper-case characters.

 @category Template literal
 */
declare type SplitIncludingDelimiters<Source extends string, Delimiter extends string> = SplitIncludingDelimiters_<UpperCaseToLowerCase<Source>, Delimiter>;

declare type SplitIncludingDelimiters_<Source extends string, Delimiter extends string> =
	Source extends '' ? [] :
		Source extends `${infer FirstPart}${Delimiter}${infer SecondPart}` ?
			(
				Source extends `${FirstPart}${infer UsedDelimiter}${SecondPart}`
					? UsedDelimiter extends Delimiter
						? Source extends `${infer FirstPart}${UsedDelimiter}${infer SecondPart}`
							? [...SplitIncludingDelimiters<FirstPart, Delimiter>, UsedDelimiter, ...SplitIncludingDelimiters<SecondPart, Delimiter>]
							: never
						: never
					: never
			) :
			[Source];

/**
 Takes the result of a splitted string literal and recursively concatenates it together into the desired casing.

 It receives `UsedWordSeparators` and `UsedUpperCaseCharacters` as input to ensure it's fully encapsulated.

 @see SplitIncludingDelimiters
 */
declare type StringArrayToDelimiterCase<Parts extends readonly any[], Start extends boolean, UsedWordSeparators extends string, UsedUpperCaseCharacters extends string, Delimiter extends string> =
	Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
		? `${StringPartToDelimiterCase<FirstPart, Start, UsedWordSeparators, UsedUpperCaseCharacters, Delimiter>}${StringArrayToDelimiterCase<RemainingParts, false, UsedWordSeparators, UsedUpperCaseCharacters, Delimiter>}`
		: Parts extends [string]
			? string
			: '';

/**
 Format a specific part of the splitted string literal that `StringArrayToDelimiterCase<>` fuses together, ensuring desired casing.

 @see StringArrayToDelimiterCase
 */
declare type StringPartToDelimiterCase<StringPart extends string, Start extends boolean, UsedWordSeparators extends string, UsedUpperCaseCharacters extends string, Delimiter extends string> =
	StringPart extends UsedWordSeparators ? Delimiter :
		Start extends true ? Lowercase<StringPart> :
			StringPart extends UsedUpperCaseCharacters ? `${Delimiter}${Lowercase<StringPart>}` :
				StringPart;

declare type UpperCaseCharacters = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

declare type UpperCaseToLowerCase<T extends string> = T extends Uppercase<T> ? Lowercase<T> : T;

declare type Whitespace =
	| '\u{9}' // '\t'
	| '\u{A}' // '\n'
	| '\u{B}' // '\v'
	| '\u{C}' // '\f'
	| '\u{D}' // '\r'
	| '\u{20}' // ' '
	| '\u{85}'
	| '\u{A0}'
	| '\u{1680}'
	| '\u{2000}'
	| '\u{2001}'
	| '\u{2002}'
	| '\u{2003}'
	| '\u{2004}'
	| '\u{2005}'
	| '\u{2006}'
	| '\u{2007}'
	| '\u{2008}'
	| '\u{2009}'
	| '\u{200A}'
	| '\u{2028}'
	| '\u{2029}'
	| '\u{202F}'
	| '\u{205F}'
	| '\u{3000}'
	| '\u{FEFF}';

declare type WordSeparators = '-' | '_' | Whitespace;

export { }
